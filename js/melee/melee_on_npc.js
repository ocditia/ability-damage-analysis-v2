import construction from './melee_const.js';

class OnNPC {
    calcVuln(dmg, flag) {
      if (flag === true) {
        dmg = Math.floor(dmg * (1 + 0.1));
      }
      return dmg;
    } 

    calcSlayerPerk(dmg, flag) {
      if (flag === true) {
        dmg = Math.floor(dmg * (1 + 0.07));
      }
      return dmg;
    }
  
    calcSlayerSigil(dmg, flag) {
      if (flag === true) {
        dmg = Math.floor(dmg * (1 + 0.15));
      }
      return dmg;
    }
  
    calcAura(dmg, settings) {
      if (settings['aura'] === 'berserker' && (settings['berserk'] === true || settings['zgs'] === true)) {
        dmg = dmg
      }
      else {
        dmg = Math.floor(dmg * (1 + construction['auras'][settings['aura']]['boost']));
      }
      return dmg;
    }

    calcCryptbloom(dmg,flag) {
      if (flag === true) {
        dmg = Math.floor(dmg * (1 + 0.1));
      }
      return dmg;
    }

    calcHaunted(dmg,haunted,AD) {
      if (haunted === true) {
        let increase = Math.floor(dmg*0.1);
        if (increase < Math.floor(0.2 * AD)) {
          return dmg + increase;
        }
        else {
          return dmg + Math.floor(0.2 * AD);
        }
      }
      return dmg
    }

    calcCustom(dmg,settings) {
      return Math.floor(dmg * (1 + settings['custom on-npc']/100));
    }

    calcRedbeam(dmg,flag) {
      if (flag === true) {
        dmg += Math.floor(dmg * 0.3);
      }
      return dmg;
    }

    calcBlackbeam(dmg,flag) {
      if (flag === true) {
        dmg -= Math.floor(dmg * 0.3);
      }
      return dmg;
    }

    calcInfernalPuzzleBox(dmg,stacks) {
      return dmg + Math.floor(dmg * 0.01 * stacks);
    }

    calcTokkulZo(dmg,flag) {
      if (flag === true) {
        dmg += Math.floor(dmg * 0.1);
      }
      return dmg;
    }

    calcKBD(dmg,flag) {
      if (flag === true) {
        dmg += Math.floor(dmg * 0.1);
      }
      return dmg;
    }

    calcInnerChaos(dmg,flag) {
      if (flag === true) {
        dmg += Math.floor(dmg * 0.05);
      }
      return dmg;
    }

    calcGuardiansTriumph(dmg,stacks,category) {
      if (category === 'basic') {
        return dmg += Math.floor(dmg * 0.2 * stacks);
      }
      return dmg;  
    }

    calcSwordofEdicts(dmg,flag) {
      if (flag === true) {
        dmg -= Math.floor(dmg * 0.05);
      }
      return dmg;
    }

    calcBalanceofPower(dmg,stacks) {
      return dmg + Math.floor(dmg * 0.06 * stacks);
    }

    calcInnerPower(dmg,stacks) {
      return dmg + Math.floor(dmg * 0.1 * stacks);
    }

    calcZamorakChoke(dmg,settings) {
      return Math.floor(dmg * (1 - settings['zamorak choke stacks']/100));
    }
  
    calcOnNpc(dmg, settings, AD, category) {
      //buffs applied in order of operations
      dmg = this.calcVuln(dmg,settings['vulnerability']);
      dmg = this.calcSlayerPerk(dmg,settings['slayer perk']);
      dmg = this.calcSlayerSigil(dmg,settings['slayer sigil']);
      dmg = this.calcAura(dmg, settings);

      //unknown order of buffs
      dmg = this.calcCryptbloom(dmg,settings['death spores']);
      dmg = this.calcCustom(dmg,settings);
      dmg = this.calcHaunted(dmg,settings['haunted'],settings['haunted AD']);
      dmg = this.calcRedbeam(dmg,settings['Telos red beam']);
      dmg = this.calcBlackbeam(dmg,settings['Telos black beam']);
      dmg = this.calcInfernalPuzzleBox(dmg,settings['Infernal puzzle box']);
      dmg = this.calcTokkulZo(dmg,settings['Tokkul-zo']);
      dmg = this.calcKBD(dmg,settings['King black dragon wilderness portal']);
      dmg = this.calcInnerChaos(dmg,settings['Zamorak inner chaos']);
      dmg = this.calcGuardiansTriumph(dmg,settings['Zamorak guardians triumph'],settings['category']);
      dmg = this.calcSwordofEdicts(dmg,settings['Zamorak sword of edicts']);
      dmg = this.calcInnerPower(dmg,settings['Raksha inner power']);
      dmg = this.calcZamorakChoke(dmg,settings);


      //zamorak inner chaos
      //zamorak guardians triumph
      //zamorak sword of edicts
      //telos red beam
      //telos black beam
      //infernal puzzle box
      //kbd wildy portal
      //tokkul-zo
        
      return dmg;
    }

    onNpcDamageList(dmgList,settings,AD) {
      const onNpcDmg = [];
      for (const i of dmgList) {
        onNpcDmg.push(this.calcOnNpc(i,settings,AD));
      }
      return onNpcDmg;
  }
  }

export default OnNPC;