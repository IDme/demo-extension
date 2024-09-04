function insertHtml(element) {
  if (element) {  
    chrome.storage.local.get(['buttonPosition', 'buttonType', 'dividerType', 'policy', 'policyOverride', 'customCopy'], function(result) {
      var dividerHTML = ''
      const position = result.buttonPosition
      const copy = result.customCopy != `` ? `<p style="text-align: center;">${result.customCopy}</p>` : ``

      const demoAppLink = result.policy == 'custom' ? result.policyOverride : `https://idme.anthonyspriggs.com/idme/sandbox/oauth/${result.policy}`

      const imgLink = `${copy}<a href="${demoAppLink}">
        <img style="max-height: 52px;margin: auto;display: block;" src="https://s3.amazonaws.com/idme/developer/idme-buttons/assets/img/${result.buttonType}.svg">
      </a>`

      switch(result.dividerType) {
        case `orbreak`: 
          dividerHTML = `<div style="width: 100%;display: flex;align-items: center;">
                          <span style="width: 40%;"><hr/></span>
                          <span style="width: 15%;margin: 10px;text-align: center;">OR</span>
                          <span style="width: 40%;"><hr/></span>
                        </div>`;
          break;
        case `break`:
          dividerHTML = `<hr/>`;
          break;
      }

      const htmlToInsert = position == 'beforebegin' ? imgLink + dividerHTML : dividerHTML + imgLink

      element.insertAdjacentHTML(position, htmlToInsert);
    });

  } else {
    console.error(`Element not found`);
  }
}

function addHoverEffect() {
  document.querySelectorAll('*').forEach(element => {
    element.addEventListener('mouseover', handleMouseOver);
    element.addEventListener('mouseout', handleMouseOut);
    element.addEventListener('click', handleClick);
  });
}

function removeHoverEffect() {
  document.querySelectorAll('*').forEach(element => {
    element.removeEventListener('mouseover', handleMouseOver);
    element.removeEventListener('mouseout', handleMouseOut);
    element.removeEventListener('click', handleClick);
  });
}

function handleMouseOver(event) {
  event.target.style.outline = '2px solid green';
}

function handleMouseOut(event) {
  event.target.style.outline = 'none';
}

function handleClick(event) {
  event.preventDefault();
  event.stopPropagation();
  const className = event.target.className;

  if (className) {
    insertHtml(event.target);
    removeHoverEffect();

    event.target.style.outline = 'none';

    chrome.storage.local.set({ extensionEnabled: false });
  } else {
    alert('No class name found for the clicked element.');
  }
}

chrome.storage.local.get(['extensionEnabled', 'buttonPosition', 'buttonType', 'dividerType'], function(result) {
  result.extensionEnabled ? addHoverEffect(): removeHoverEffect()

  chrome.storage.local.set({ extensionEnabled: result.extensionEnabled })
  chrome.storage.local.set({ buttonPosition: result.buttonPosition || 'beforebegin' })
  chrome.storage.local.set({ buttonType: result.buttonType || 'signin' })
  chrome.storage.local.set({ dividerType: result.dividerType || 'orbreak' })
});
