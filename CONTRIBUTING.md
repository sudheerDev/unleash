# Contributing

## Issues on board

Before contributing please go to our [Waffle board](https://waffle.io/x-team/unleash) and find an issue you would like to work on.


## Branch naming

We use the automated [Waffle workflow](https://help.waffle.io/automatic-work-tracking/auto-work-tracking-basics/recommended-workflow-using-pull-requests-automatic-work-tracking) - please get yourself acustomed with it first.

Basically the idea is that when you start working on an issue, create a new branch containing the number of the issue and push it to origin. This will automatically assign you to the task and put it in the "In Progress" column on the board.

### Example

I have chosen issue 21 (f.e. about fixing the layout) to work on so I update my develop branch:

```
git checkout develop
git pull origin develop
```
Then accordingly to Waffle worfklow I create a branch and push it to origin:

```
git checkout -b fixing_the_layout-#21
git push origin fixing_the_layout-#21
```
Now I am automatically assigned to the issue and it's in progress.

Whenever I'm done, I will push the changes again and create a PR.

## PR naming

Please add the word "fixes" and issue number in the PR title. So following the example above my PR would be titled for example: `Change Layout - fixes #21`

## Testing

Before submitting a PR please run tests on your branch.

In order to run tests please type:
```
docker-compose run web yarn test
```

In order to run lint please type:
```
docker-compose run web yarn test:lint
```

## Nice to have

- Would be nice if every PR had 1 commit only - you can squash your commits into 1 commit before submitting a PR ([[1](https://github.com/blog/2141-squash-your-commits)], [[2](http://eli.thegreenplace.net/2014/02/19/squashing-github-pull-requests-into-a-single-commit)]).
- Would be nice if whenever there are visual changes, your PR contained a screenshot.
- Would be nice if the commit messages followed git's built-in conventions. Read more [here](https://chris.beams.io/posts/git-commit/)
