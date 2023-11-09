// Taken from Park-Dex

export const highlight = (desc, terms) => {
    const regex = new RegExp(
      terms.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
      "gi"
    );
    const final_highlighted_html = desc.replace(regex, (match) => {
      return `<span class="highlight">${match}</span>`;
    });
  
    return final_highlighted_html;
  };
  