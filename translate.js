const fs = require('fs');
const path = require('path');

// 1. 定义目标 C++ 文件的路径（根据实际需要微调）
const filePath = path.join(__dirname, 'src', 'npc_enchanter.cpp');

// 2. 汉化文本映射字典（合并了您之前和现在所有的文本）
const translations = {
    // === 这一批新增的附魔属性/选项 ===
    'Blade Ward': '刃卫',
    'Blood Draining': '血涌',
    '26 Agility': '26 敏捷',
    '45 Spirit': '45 精神',
    'Berserking': '狂暴',
    '25 Hit Rating + 25 Critical': '25 命中等级 + 25 暴击',
    'Black Magic': '黑魔法',
    'Battlemaster': '战斗大师',
    'Icebreaker': '破冰',
    'Lifeward': '生命守护',
    '50 Stamina': '50 耐力',
    '65 Attack Power': '65 攻击强度',
    '63 Spell Power': '63 法术强度',
    'Mongoose': '猫鼬',
    'Executioner': '斩杀',
    'Back': '返回',

    // === 具体属性数值（请根据源码严格核对数字与空格） ===
    '26 Agility': '26 敏捷',
    '35 Agility': '35 敏捷',
    '45 Spirit': '45 精神',
    '50 Stamina': '50 耐力',
    '65 Attack Power': '65 攻击强度',
    '110 Attack Power': '110 攻击强度',
    '63 Spell Power': '63 法术强度',
    '81 Spell Power': '81 法术强度',
    '25 Hit Rating + 25 Critical': '25 命中等级 + 25 暴击',

    // === 防御、韧性及其他特殊属性（新增） ===
    '20 Defense': '20 防御等级',
    '25 Intellect': '25 智力',
    '12 Resilience': '12 韧性等级',
    '36 Block': '36 格挡值',
    '18 Stamina': '18 耐力',
    '81 Block + 50% Less Disarm': '81 格挡值 + 50% 缴械时间缩短',

    // === 头部/肩部高级附魔及双属性组合（新增） ===
    '30 Spell Power + 10 Mp5': '30 法术强度 + 每5秒恢复10点法力值',
    '30 Spell Power + 20 Crit': '30 法术强度 + 20 暴击等级',
    '29 Spell Power + 20 Resilience': '29 法术强度 + 20 韧性等级',
    '30 Stamina + 25 Resilience': '30 耐力 + 25 韧性等级',
    '37 Stamina + 20 Defense': '37 耐力 + 20 防御等级',
    '50 Attack Power + 20 Crit': '50 攻击强度 + 20 暴击等级',
    '50 Attack Power + 20 Resilience': '50 攻击强度 + 20 韧性等级',

    // === 诺森德阵营声望头部抗性秘药系列 ===
    'Arcanum of Eclipsed Moon': '黯月秘药 (25奥抗/30耐力)',
    'Arcanum of the Flame\'s Soul': '烈焰灵魂秘药 (25火抗/30耐力)',
    'Arcanum of the Fleeing Shadow': '逃兵阴影秘药 (25暗抗/30耐力)',
    'Arcanum of the Frosty Soul': '冰霜灵魂秘药 (25冰抗/30耐力)',
    'Arcanum of Toxic Warding': '剧毒防护秘药 (25自然抗/30耐力)',

    // === 肩部高级与普通附魔属性组合（新增） ===
    '120 Attack Power + 15 Crit': '120 攻击强度 + 15 暴击等级',
    '70 Spell Power + 8 Mp5': '70 法术强度 + 每5秒恢复8点法力值',
    '60 Dodge + 15 Defense': '60 闪避等级 + 15 防御等级',
    '70 Spell Power + 15 Crit': '70 法术强度 + 15 暴击等级',
    '40 Attack Power + 15 Crit': '40 攻击强度 + 15 暴击等级',
    '24 Spell Power + 8 Mp5': '24 法术强度 + 每5秒恢复8点法力值',
    '30 Stamina + 15 Resilience': '30 耐力 + 15 韧性等级',
    '20 Dodge + 15 Defense': '20 闪避等级 + 15 防御等级',
    '24 Spell Power + 15 Crit': '24 法术强度 + 15 暴击等级',
    '23 Spell Power + 15 Resilience': '23 法术强度 + 15 韧性等级',
    '40 Attack Power + 15 Resilience': '40 攻击强度 + 15 韧性等级',

    // === 披风专属/专业附魔及常规属性（新增） ===
    'Darkglow Embroidery': '暗光刺绣 (裁缝专属-回魔)',
    'Lightweave Embroidery': '亮纹刺绣 (裁缝专属-法强)',
    'Swordguard Embroidery': '剑卫刺绣 (裁缝专属-攻强)',
    'Parachute': '弹性衬垫 (工程专属-降落伞)',
    'Shadow Armor': '高弹力衬垫 (工程专属-敏捷/降落伞)',
    '10 Spirit + 2% Reduced Threat': '10 精神 + 2% 威胁值降低',
    '16 Defense': '16 防御等级',
    '35 Spell Penetration': '35 法术穿透',
    '225 Armor': '225 护甲值',
    '22 Agility': '22 敏捷',
    '23 Haste': '23 急速等级',

    // === 胸甲核心附魔属性（新增） ===
    '+10 All Stats': '+10 所有属性',
    '225 Health': '225 生命值',
    '10 Mp5': '每5秒恢复10点法力值',
    '20 Resilience': '20 韧性等级',
    '22 Defense': '22 防御等级',

    // === 护腕常规附魔与制皮专属毛皮衬垫（新增） ===
    '40 Stamina': '40 耐力',
    '30 Spell Power': '30 法术强度',
    '50 Attack Power': '50 攻击强度',
    '18 Spirit': '18 精神',
    '15 Expertise': '15 精准等级',
    '+6 All Stats': '+6 所有属性',
    '16 Intellect': '16 智力',
    'Fur Lining - Arcane Resist': '毛皮衬垫 - 奥术抗性 (制皮专属)',
    'Fur Lining - Fire Resist': '毛皮衬垫 - 火焰抗性 (制皮专属)',
    'Fur Lining - Frost Resist': '毛皮衬垫 - 冰霜抗性 (制皮专属)',
    'Fur Lining - Nature Resist': '毛皮衬垫 - 自然抗性 (制皮专属)',
    'Fur Lining - Shadow Resist': '毛皮衬垫 - 阴影抗性 (制皮专属)',
    'Fur Lining - Attack Power': '毛皮衬垫 - 攻击强度 (制皮专属)',
    'Fur Lining - Stamina': '毛皮衬垫 - 耐力 (制皮专属)',
    'Fur Lining - Spellpower': '毛皮衬垫 - 法术强度 (制皮专属)',

    // === 手套常规附魔与工程专属加速器（新增） ===
    'Hyperspeed Accelerators': '超级加速器 (工程专属-急速)',
    '16 Critical Strike': '16 暴击等级',
    '2% Threat + 10 Parry': '2% 威胁值提高 + 10 招架等级',
    '44 Attack Power': '44 攻击强度',
    '20 Agility': '20 敏捷',
    '20 Hit Rating': '20 命中等级',

    // === 腿部魔线与护甲片属性组合（新增） ===
    '40 Resilience + 28 Stamina': '40 韧性等级 + 28 耐力',
    '55 Stamina + 22 Agility': '55 耐力 + 22 敏捷',
    '75 Attack Power + 22 Critical': '75 攻击强度 + 22 暴击等级',
    '50 Spell Power + 22 Spirit': '50 法术强度 + 22 精神',
    '50 Spell Power + 30 Stamina': '50 法术强度 + 30 耐力',
    '72 Stamina + 35 Agility': '72 耐力 + 35 敏捷 (制皮专属)',
    '100 Attack Power + 36 Critical': '100 攻击强度 + 36 暴击等级 (制皮专属)',

    // === 鞋子常规附魔与工程学特殊配件（新增） ===
    '32 Attack Power': '32 攻击强度',
    '15 Stamina + Minor Speed Increase': '15 耐力 + 略微提高移动速度',
    '16 Agility': '16 敏捷',
    'Restore 7 Health + Mp5': '每5秒恢复7点生命值与法力值',
    '12 Hit Rating + 12 Critical': '12 命中等级 + 12 暴击等级',
    '22 Stamina': '22 耐力',
    'Nitro Boots': '硝化甘油推进器 (工程专属-火箭靴)',
    'Hand-Mounted Pyro Rocket': '手雷发射器 (工程专属-手套火箭炮)',
    'Reticulated Armor Webbing': '网状护甲片 (工程专属-手套护甲)',

    // === 戒指常规附魔及核心属性（新增） ===
    '40 Attack Power': '40 攻击强度',
    '23 Spell Power': '23 法术强度',
    '30 Stamina': '30 耐力',


    // === 上一批的附魔菜单（保留兼容） ===
    'Enchant Main Weapon': '附魔主手武器',
    'Enchant Offhand Weapon': '附魔副手武器',
    'Enchant 2H Weapon': '附魔双手武器',
    'Enchant Shield': '附魔盾牌',
    'Enchant Head': '附魔头部',
    'Enchant Shoulders': '附魔肩部',
    'Enchant Cloak': '附魔披风',
    'Enchant Chest': '附魔胸甲',
    'Enchant Bracers': '附魔护腕',
    'Enchant Gloves': '附魔手套',
    'Enchant Legs': '附魔腿部',
    'Enchant Boots': '附魔靴子',
    'Enchant Rings': '附魔戒指'
};

try {
    // 3. 读取源文件
    let content = fs.readFileSync(filePath, 'utf8');
    let replaceCount = 0;

    // 4. 遍历字典进行深度、安全地替换
    for (const [english, chinese] of Object.entries(translations)) {
        // 转义英文文本中的正则特殊字符（如 + 号等）
        const escapedEnglish = english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        /**
         * 🔍 超精准复合正则表达式原理解析:
         * /(AddGossipItemFor\s*\(\s*[^,]+\s*,\s*[^,]+\s*,\s*")([^"\\]*(?:\\.[^"\\]*)*)(")/g
         * 
         * 为了性能与极高的可读性，这里使用两个组合正则共同验证：
         * 
         * 1. 第一种情况：带有图标控制符的旧文本（如 |t[Enchant Main Weapon] 或 |tBlade Ward）
         *    /(\|t\s*(?:\[)?)(英文文本)((?:\])?)/gi
         * 
         * 2. 第二种情况：新文本，严格锁定在 AddGossipItemFor 的第三个双引号参数中
         *    /(AddGossipItemFor\s*\(\s*\w+\s*,\s*[^,]+\s*,\s*")((?:\|T[^"]+?\|t)?)英文文本(")/g
         */
        
        // 规则 A：针对纯文字版 AddGossipItemFor(player, 1, "Blade Ward", ... )
        // 捕获组1：AddGossipItemFor 及其前两个参数加左双引号
        // 捕获组2：右双引号
        const regexNew = new RegExp(`(AddGossipItemFor\\s*\\(\\s*\\w+\\s*,\\s*[^,]+\\s*,\\s*")(${escapedEnglish})(")`, 'g');

        // 规则 B：针对带图标或带中括号的旧版本（实现完美向下兼容）
        const regexOld = new RegExp(`(\\|t\\s*\\[?)${escapedEnglish}(\\]?)`, 'gi');

        // 执行规则 A 替换
        if (regexNew.test(content)) {
            content = content.replace(regexNew, `$1${chinese}$3`);
            replaceCount++;
        }
        
        // 执行规则 B 替换
        if (regexOld.test(content)) {
            content = content.replace(regexOld, `$1${chinese}$2`);
            replaceCount++;
        }
    }

    // 5. 将修改后的内容写回文件
    if (replaceCount > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ 安全汉化完成！本次共精准替换了 ${replaceCount} 处游戏内文本。`);
    } else {
        console.log('⚠️ 未检测到符合 C++ 语法匹配规则的英文文本。');
    }

} catch (error) {
    console.error('❌ 执行替换时发生错误:', error.message);
}
