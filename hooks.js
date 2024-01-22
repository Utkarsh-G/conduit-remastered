const hookindex = Hooks.on('createChatMessage', async (chatMessage) => {

    const action = chatMessage.flags?.pf2e?.context?.action
   
  
  
    const isEldritchBlastUnstance = chatMessage.flags?.pf2e?.context?.domains?.includes("eldritch-blast-attack")
  
    const isEldritchBlast = chatMessage.flags?.pf2e?.context?.domains?.find((d) => d === "eldritch-blast-attack" || 
     d === "eldritch-blast-cuffs-attack" ||
     d === "eldritch-blast-familiar-ranged-attack" ||
     d === "eldritch-blast-familiar-melee-attack" ||
     d === "eldritch-blast-hilt-attack");
   
    const outcome = chatMessage.flags?.pf2e?.context?.unadjustedOutcome
  
    if (action==="strike" && isEldritchBlast && outcome)
    {
      console.log("Valid for bond change.")
      if (outcome === "success"){
        console.log("in success mode")
        const macroId = await fromUuid("Compendium.conduit.conduitmacros.Macro.BVckP55g3gsziM0i")
        macroId.execute({"actorIn":chatMessage.speaker?.actor})
      }
      if (outcome === "criticalSuccess"){
        const macroId = await fromUuid("Compendium.conduit.conduitmacros.Macro.seIlZQmgUrZnY6oq")
        macroId.execute({"actorIn":chatMessage.speaker?.actor})
      }
      if (outcome === "criticalFailure"){
        const macroId = await fromUuid("Compendium.conduit.conduitmacros.Macro.FVIV22wJsUpRl12v")
        macroId.execute({"actorIn":chatMessage.speaker?.actor})
      }
  
    }
  
  
  });
  
  console.log("Hook index for listening to eldritch blasts:")
  console.log(hookindex)
  
const hookindex2 = Hooks.on('createItem', async (item) => {

const cuffsName = "Stance: Cuffs Stance"
const familiarName = "Stance: Familiar Stance"
const hiltName = "Stance: Hilt Stance"
const type = "effect"

if (item.name === cuffsName && item.type === type){
  const speaker = item.parent
  const chatMessage = `<body><p>Entering Cuffs Stance. As part of the same action, you may recall knowledge, create a diversion, or demoralize.</p></body>`
  await ChatMessage.create({speaker: ChatMessage.getSpeaker({speaker}), content: chatMessage})
}

if (item.name === familiarName && item.type === type){
  const speaker = item.parent
  const chatMessage = `<body><p>Entering Familiar Stance. As part of the same action, you may command your eldritch familiar.</p></body>`
  await ChatMessage.create({speaker: ChatMessage.getSpeaker({ speaker}), content: chatMessage})
}

if (item.name === hiltName && item.type === type){
  const speaker = item.parent
  const chatMessage = `<body><p>Entering Hilt Stance. As part of the same action, you may Interact to draw, swap, or pick up the hilt to meet the stance's requirements. If you already wield the hilt, you may feint, parry, or interact to change grip.</p></body>`
  await ChatMessage.create({speaker: ChatMessage.getSpeaker({ speaker}), content: chatMessage})
}
  
});

console.log("Hook index for listening to stance creation:")
console.log(hookindex2)