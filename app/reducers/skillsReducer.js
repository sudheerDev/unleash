import each from 'lodash/each';
import { SKILL } from '../actions/SkillActions';

const initialState = {
  list: [],
  resourceList: [],
  voteList: [],
  resourcesLoading: false,
  isLoading: false,
  addSkillModal: {
    showModal: false,
    showSpinner: false,
    name: '',
  },
};

function updateVotes(votes, resourceId, vote) {
  let existingVoteIndex = -1;
  each(votes[resourceId], (existingVote, index) => {
    if (existingVote.authorId === vote.authorId) {
      existingVoteIndex = index;
    }
  });

  if (existingVoteIndex !== -1) {
    votes[resourceId].splice(existingVoteIndex, 1);
  } else {
    votes[resourceId].push(vote);
  }

  return votes;
}

function skillsReducer(state = initialState, action) {
  const { errors = [] } = action;

  switch (action.type) {
    case SKILL.FETCH.START:
      return {
        ...state,
        list: [],
        isLoading: true,
      };
    case SKILL.FETCH.SUCCESS:
      return {
        ...state,
        list: action.skills,
        isLoading: false,
      };
    case SKILL.FETCH.FAILURE:
      return {
        ...state,
        list: [],
        isLoading: false,
      };
    case SKILL.LIST_RESOURCE.START:
      return {
        ...state,
        resourceList: [],
        resourcesLoading: true,
      };
    case SKILL.LIST_RESOURCE.SUCCESS:
      return {
        ...state,
        resourceList: action.resources,
        resourcesLoading: false,
      };
    case SKILL.LIST_RESOURCE.FAILURE:
      return {
        ...state,
        resourceList: [],
        resourcesLoading: false,
      };
    case SKILL.LIST_VOTE.START:
      return {
        ...state,
        voteList: [],
      };
    case SKILL.LIST_VOTE.SUCCESS:
      return {
        ...state,
        voteList: {
          ...state.voteList,
          [action.resourceId]: action.votes,
        },
      };
    case SKILL.LIST_VOTE.FAILURE:
      return {
        ...state,
        voteList: [],
      };
    case SKILL.ADD_RESOURCE.START:
      return { ...state, errors };
    case SKILL.ADD_RESOURCE.SUCCESS:
      return {
        ...state,
        resourceList: [
          ...state.resourceList,
          action.resource,
        ],
      };
    case SKILL.ADD_RESOURCE.FAILURE:
      return { ...state, errors };
    case SKILL.VOTE_RESOURCE.START:
      return { ...state };
    case SKILL.VOTE_RESOURCE.SUCCESS:
      return {
        ...state,
        voteList: updateVotes(state.voteList, action.resourceId, action.vote),
      };
    case SKILL.VOTE_RESOURCE.FAILURE:
      return { ...state, errors };
    case SKILL.ADD.UPDATE_FIELD:
      return {
        ...state,
        addSkillModal: {
          ...state.addSkillModal,
          [action.fieldKey]: action.fieldValue,
        },
      };
    case SKILL.ADD.SHOW_MODAL:
      return {
        ...state,
        addSkillModal: {
          ...state.addSkillModal,
          showModal: action.showModal,
        },
      };
    case SKILL.ADD.SHOW_SPINNER:
      return {
        ...state,
        addSkillModal: {
          ...state.addSkillModal,
          showModal: action.showSpinner,
        },
      };
    case SKILL.ADD.RESET:
      return {
        ...state,
        addSkillModal: {
          ...initialState.addSkillModal,
        },
      };
    default:
      return state;
  }
}

export default skillsReducer;
