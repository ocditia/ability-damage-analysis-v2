class Crit {
    calcFCritChance(settings) {
        if (settings['aura'] === 'equilibrium') {
            return 0;
          }
          
        let fcrit = 0.1 +
            (0.05 * settings['crit-i-kal']) +
            (0.01 * settings['kalgerion demon familiar']) +
            (0.02 * settings['biting']);

        if (settings['ring'] === 'reavers') {
            fcrit = fcrit + 0.05;
        }
        if (settings['pocket slot'] === 'grimoire') {
            fcrit = fcrit + 0.12;
        }        
        fcrit += settings['custom crit chance']/100;
        return Math.min(fcrit,1);
    }

    critDmgBuff(dmg,settings) {
        let modifier = 0.0;
        let level_mod = 0.05 * (1 + Math.floor(settings['level']/10));
        modifier = modifier + Math.min(level_mod,0.5);
        if (settings['smoke cloud'] === true) {
            modifier = modifier + 0.06;
        }

        return Math.floor(dmg * (1 + modifier));
    }

    critDamageList(dmgList,settings) {
        const critDamage = [];
        for (const i of dmgList) {
            critDamage.push(this.critDmgBuff(i,settings));
        }
        return critDamage;
    }
}

export default Crit;
