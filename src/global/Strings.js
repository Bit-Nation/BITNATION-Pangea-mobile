/*
	Bitnation Text Strings
	Version 0.3.1
*/


// ========================================
// DEFAULT STRINGS
// Text strings
// ========================================

const defaultStrings = {
	
	// ========================================
	// Default Strings
	
	// Navigation
	dashboard: 'Dashboard',
	nations: 'Nations',
	chat: 'Chat',
	wallet: 'Wallet',
	profile: 'Profile',
	
	//Nations
	createNationTitle: 'Create A Nation',
	
	
	// Wallet strings
	send: 'Send',
	receive: 'Receive',
	sendTo: 'To',
	receiveFrom: 'From',
	note: 'Note',
	amount: 'Amount',
	fee: 'Fee',
	blockchainAddress: 'Address',
	
	sendCommand: 'Send',
	
	
	//General
	optional: 'Optional',
	
}

// ========================================
// Nation Strings
// ========================================
const walletStrings = {
	governmentalStructure: 'Governmental Structure',
	
	scanQRCodeMsg: 'The sender can scan this QR code with a phone or computer camera to get your wallet address.',
	copyAddressMsg: 'You can copy your wallet address and send any way you choose, e.g. SMS or email. Do not try to type your address by hand!',
	
	
}

// ========================================
// Wallet Strings
// ========================================
const nationStrings = {
	scanQRCodeMsg: 'The sender can scan this QR code with a phone or computer camera to get your wallet address.',
	copyAddressMsg: 'You can copy your wallet address and send any way you choose, e.g. SMS or email. Do not try to type your address by hand!',
}

// ========================================
// LANGUAGE LOCALIZATION STRINGS
// ========================================

const FR = {
	governmentalStructure: 'Structure gouvernementale',
}

const strings = {
	...defaultStrings,
	...walletStrings,
	...nationStrings,
}


export default strings
