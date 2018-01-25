## Tech & utils Stack
- React Native
- Javascript
- Realm (pulled in by pangea lib's)
- [Pangea lib's](https://github.com/Bit-Nation/BITNATION-Pangea-libs)

## Note on the ecosystem
> Since we (bitnation) aim to be decentralized we avoid any use of central systems. So when you here we are building a chat you might think we are using firebase. Or when you hear that we have user profiles you might think that we are collecting emails.
> This is actually not how the system work. We e.g. use a mesh network for our chat (every user is a node in the network and secures it). Our user profiles are private and public key's where you share your public key as your ID and keep your private key safe as something that you e.g. use to verify an message.
> That mean's that it is extremely hard for people to censor this network or deny you access. Even we (Bitnation) can't deny you access to our network since we don't "control" it.
> When ever you have questions about this system just open an issue for it.

## How the system work
> We are building for mobile and desktop (ok, we didn't start working on an desktop version - but we will).
> Therefor we decided to abstract some of the logic:
![](./assets/modules_overview.png?raw=true)

1. The user interact with the UI (let's say he create an nation)
2. The UI takes the data, and call the nation create method from the nation's module provided by pangea lib's (pangea lib's is an collection of modules consumed by pangea)
3. The nation module submit the data to the blockchain and do some other stuff (maybe adding a job to the transaction queue, which is as well provided by pangea lib's) and resolves reject the returned promise.

This way the UI is contain's very less business logic (all the stuff like interaction with the blockchain etc, is done by the nation's module)

So when ever you think you need to create logic that will be used by both clients. Create it in this repo [Pangea lib's](https://github.com/Bit-Nation/BITNATION-Pangea-libs)

Ask someone from the team if you are not sure where to add it.