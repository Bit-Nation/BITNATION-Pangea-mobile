import { self } from 'react-native-threads';
import defaultDB from './src/services/database';

self.onmessage = async (data) => {
  const nationData = JSON.parse(data);
  const db = await defaultDB;
  db.write(() => {
    db.create('Nation', {
      id: nationData.id,
      accountId: nationData.currentAccountId,
      idInSmartContract: nationData.idInSmartContract,
      nationName: nationData.nationName,
      nationDescription: nationData.nationDescription,
      created: true,
      exists: nationData.exists,
      virtualNation: nationData.virtualNation,
      nationCode: nationData.nationCode,
      lawEnforcementMechanism: nationData.lawEnforcementMechanism,
      profit: nationData.profit,
      nonCitizenUse: nationData.nonCitizenUse,
      diplomaticRecognition: nationData.diplomaticRecognition,
      decisionMakingProcess: nationData.decisionMakingProcess,
      governanceService: nationData.governanceService,
      joined: nationData.isNationJoined,
      citizens: nationData.citizensNumber,
    });
  });
  self.postMessage('done');
}
