// components/TagFilter.js

import React, { useState } from 'react';

const tags = ['Biography', 'Science', 'Technology', 'History']; // Example tags

const TagFilter = ({ onTagSelect }) => {
  const [selectedTag, setSelectedTag] = useState('');

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    onTagSelect(tag);
  };

  return (
    <div className="tag-filter">
      {tags.map(tag => (
        <button
          key={tag}
          className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
