// import {ParticipantInterface} from "../api/participant/interfaces/participant.interface";
// import {LinkInterface} from "../api/link/interface/link.interface";
// import {v4 as uuidv4} from "uuid";
//
// const generateNewLink = (test_id : string) =>
// {
//     const participants : ParticipantInterface[] = getParticipantsFromDatabase(test_id);
//     participants.forEach(participant => {
//
//     const linkGuid = uuidv4();
//     const link : LinkInterface = {
//         id: linkGuid,
//         participant_id: participant.id,
//         used: false,
//         sent_at: Date.now().toString(),
//         link: linkGuid,
//     };
//     sendEmail(link.link, participant.email);
//     })
// }
//
//
// const checkLink = (linkFromPath : string) =>
// {
//     const link : LinkInterface = getLinkFromDatabase(linkFromPath);
//     if(!link) return null;
//     if(link.used) return null;
//     const participant : ParticipantInterface = getParticipantFromDatabase(link.participant_id);
//     link.used = true;
//     updateLinkToDatabase(linkFromPath, link);
//     return participant;
// }
//
//
// const sendEmail = (link : string, email : string) =>
// {
//     return true;
// }