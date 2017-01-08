import React from 'react';
import iconNames from '../constants/icons';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

const IconSelector = ({ label, value, onChange }) => {
  const iconElements = iconNames.map((iconSelectorName) => {
    const iconName = iconSelectorName.replace('icon-', '');
    const iconNode = <span><i className={iconSelectorName} /> {iconName}</span>;
    const menuItem = <MenuItem primaryText={iconNode} />;
    return { text: iconName, value: menuItem, iconValue: iconSelectorName };
  });

  return (
    <AutoComplete
      floatingLabelText={label}
      value={value}
      dataSource={iconElements}
      openOnFocus
      fullWidth
      onNewRequest={({ iconValue }) => onChange(iconValue)}
    />
  );
};

IconSelector.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

IconSelector.defaultProps = {
  label: 'Icon'
};

export default IconSelector;
