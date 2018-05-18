const ethers = require('ethers');

export default function CustomSigner(privateKey, provider) {

  const wallet = new ethers.Wallet(privateKey);
  this.provider = new ethers.providers.InfuraProvider(provider);
  this.address = wallet.address;
  this.blah = 'hello';

  this.sign = (transaction) => {
    console.log('SIGNED');
    throw Error('worked!');
    // return new Promise(function(resolve, reject) {
    //   var allow = confirm('Sign Transaction? To: ' + transaction.to +
    //     ", Amount: " + ethers.formatEther(transaction.value));
    //
    //   var etherString = ethers.formatEther(transaction.value);
    //
    //   var modal = document.createElement('pre');
    //   document.body.appendChild(modal);
    //   modal.className = "modal";
    //   modal.textContent += 'Sign Transaction?\n';
    //   modal.textContent += 'To:     ' + transaction.address + '\n';
    //   modal.textContent += 'Amount: ' +  etherString + '\n';
    //
    //   var confirmButton = document.createElement('div');
    //   modal.appendChild(confirmButton);
    //   confirmButton.textContent = ""confirm";
    //   confirmButton.onclick = function() {
    //     resolve(wallet.sign(transaction));
    //   }
    //
    //   var rejectButton = document.createElement('div');
    //   modal.appendChild(rejectButton);
    //   rejectButton.textContent = ""confirm";
    //   rejectButton.onclick = function() {
    //     modal.remove();
    //     reject(new Error('cancelled transaction'));
    //   }
    // }
  };
}
