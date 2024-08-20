document.getElementById('toggleExtensionBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.storage.local.get(['extensionEnabled'], function(result) {
      chrome.storage.local.set({ extensionEnabled: !result.extensionEnabled });

      const buttonCopy = result.extensionEnabled ? 'Enable' : 'Disable'
      const buttonElement = document.getElementById('toggleExtensionBtn')
      
      buttonElement.textContent = `${buttonCopy} Extension`;
      buttonElement.classList.toggle('disabled')
    });
    
    chrome.tabs.reload(tabs[0].id);
  });
});

document.getElementById('policySelect').addEventListener('change', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const policySelect = document.getElementById('policySelect')
    
    document.getElementById('customPolicyContainer').hidden = policySelect.value != 'custom';

    chrome.storage.local.get(['policy'], function(result) {
      chrome.storage.local.set({ policy: policySelect.value});
    });
    
    chrome.tabs.reload(tabs[0].id);
  });
});

document.getElementById('customPolicyInput').addEventListener('input', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.storage.local.get(['policyOverride'], function(result) {
      chrome.storage.local.set({ policyOverride: document.getElementById('customPolicyInput').value});
    });
    
    chrome.tabs.reload(tabs[0].id);
  });
});

document.getElementById('positionSelect').addEventListener('change', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.storage.local.get(['buttonPosition'], function(result) {
      chrome.storage.local.set({ buttonPosition: document.getElementById('positionSelect').value});
    });
    
    chrome.tabs.reload(tabs[0].id);
  });
});

document.getElementById('buttonSelect').addEventListener('change', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.storage.local.get(['buttonType'], function(result) {
      chrome.storage.local.set({ buttonType: document.getElementById('buttonSelect').value});
    });
    
    chrome.tabs.reload(tabs[0].id);
  });
});

document.getElementById('dividerSelect').addEventListener('change', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.storage.local.get(['dividerType'], function(result) {
      chrome.storage.local.set({ dividerType: document.getElementById('dividerSelect').value});
    });
    
    chrome.tabs.reload(tabs[0].id);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  function displayStorageData() {
    chrome.storage.local.get([
      'extensionEnabled', 
      'buttonPosition',
      'buttonType', 
      'dividerType', 
      'policy', 
      'policyOverride'
    ], function(result) {

      const buttonCopy = result.extensionEnabled ? 'Disable' : 'Enable'

      const policy = result.policy || 'login'
      const policyOverride = result.policyOverride || null
      const position = result.buttonPosition || 'beforebegin'
      const button = result.buttonType || 'signin'
      const divider = result.dividerType || 'orbreak'

      const buttonElement = document.getElementById('toggleExtensionBtn')
      const extensionStatus = result.extensionEnabled ? 'enabled' : 'disabled'

      document.getElementById('policySelect').value = policy;
      document.getElementById('customPolicyInput').value = policyOverride;
      document.getElementById('positionSelect').value = position;
      document.getElementById('buttonSelect').value = button;
      document.getElementById('dividerSelect').value = divider;
      
      document.getElementById('extensionStatus').innerHTML = `Extension is currently <strong>${extensionStatus}</strong>.`;
      document.getElementById('customPolicyContainer').hidden = policy != 'custom';

      buttonElement.textContent = `${buttonCopy} Extension`;

      result.extensionEnabled ? buttonElement.classList.add('disabled') : buttonElement.classList.remove('disabled')
    });
  }

  displayStorageData();
});
