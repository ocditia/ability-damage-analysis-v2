import AbilityDmg from '../melee_ad.js';
import OnNPC from '../melee_on_npc.js';
import OnHit from '../melee_on_hit.js';
import Crit from '../melee_crit.js';
import MeleeHelper from '../melee_helper.js';
import Avg from '../average_damage.js';
import construction from '../melee_const.js';


function ezk_bleed(type, settings, numberOfHits) {
    const AD_INS = new AbilityDmg();
    const NPC_INS = new OnNPC();
    const HIT_INS = new OnHit();
    const CRIT_INS = new Crit();
    const AVG_INS = new Avg();
    const Helper = new MeleeHelper(); 
    let abil_val = 'ezk - bleed hit'
    let fixedPercent = construction['abilities'][abil_val]['fixed percent'];
    let variablePercent = construction['abilities'][abil_val]['variable percent'];
    settings['category'] = construction['abilities'][abil_val]['category'];

    numberOfHits = Math.floor(settings['ezk bleed']);

    //calculates ability damage
    let AD = AD_INS.calcAd(type,settings,1); //AD_INS.calcAd(type,settings);

    if (settings['chaos roar'] === true) {
        AD = 2 * AD;
      }
        
    //sets fixed and variable damage
    let fixed = Math.floor(AD * fixedPercent);
    let variable = Math.floor(AD * variablePercent);

    const hits = []
   
    for(var hitsplat = 0; hitsplat < numberOfHits; hitsplat++) {
        const damageObject = Helper.damageObjectCreator(settings);
        
        //applies on-hit effects
        let onHit = HIT_INS.calcOnHit(fixed, variable, type, construction['abilities'][abil_val]['on hit effects'],settings);

        //sets up for further calculations
        damageObject['non-crit']['list'] = Helper.baseDamageListCreator(onHit[0],onHit[1]);

        //apply crit dmg
        damageObject['crit']['list'] = CRIT_INS.critDamageList(damageObject['non-crit']['list'], settings);

        //apply on-npc effects and hitcaps
        damageObject['non-crit']['list'] = NPC_INS.onNpcDamageList(damageObject['non-crit']['list'],settings,AD);
        damageObject['crit']['list'] = NPC_INS.onNpcDamageList(damageObject['crit']['list'],settings,AD);     
        
        //apply hit caps
        damageObject['non-crit']['list'] = Helper.hitCapDmgList(damageObject['non-crit']['list'],settings);
        damageObject['crit']['list'] = Helper.hitCapDmgList(damageObject['crit']['list'],settings);
  
        //calc min, avg, or max depending on request
        hits.push(AVG_INS.returnDecider(damageObject,settings,abil_val));

        fixed += Math.floor(fixed * 0.05);
        variable += Math.floor(variable * 0.05);
    }

    //calc total damage
    hits.push(Helper.totalDamageCalc(hits));
    return Helper.flooredList(hits);
}

export default ezk_bleed;
