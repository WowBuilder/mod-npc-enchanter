-- --------------------------------------------------------------------------------------
--	ENCHANTER - 601015
-- --------------------------------------------------------------------------------------
SET
@Entry 		:= 601015,
@Model 		:= 9353, -- Undead Necromancer
@Name 		:= "Beauregard Boneglitter",
@Title 		:= "Enchantments",
@Icon 		:= "Speak",
@GossipMenu := 0,
@MinLevel 	:= 80,
@MaxLevel 	:= 80,
@Faction 	:= 35,
@NPCFlag 	:= 1,
@Scale		:= 1.0,
@Type 		:= 7,
@TypeFlags 	:= 0,
@FlagsExtra := 2,
@AIName		:= "",
@Script 	:= "npc_enchantment";

-- NPC CREATURE
DELETE FROM creature_template WHERE entry = @Entry;
INSERT INTO creature_template (`entry`, `name`, `subname`, `IconName`, `gossip_menu_id`, `minlevel`, `maxlevel`, `faction`, `npcflag`, `speed_walk`, `speed_run`, `unit_class`, `unit_flags`, `type`, `type_flags`, `RegenHealth`, `flags_extra`, `AiName`, `ScriptName`) VALUES(@Entry, @Name, @Title, @Icon, @GossipMenu, @MinLevel, @MaxLevel, @Faction, @NPCFlag, 1, 1.14286, 1, 2, @Type, @TypeFlags, 1, @FlagsExtra, @AIName, @Script);

-- NPC MODEL
DELETE FROM `creature_template_model` WHERE `CreatureID` = @Entry;
INSERT INTO `creature_template_model` (`CreatureID`, `Idx`, `CreatureDisplayID`, `DisplayScale`, `Probability`, `VerifiedBuild`) VALUES
(@Entry, 0, @Model, 1, 1, 0);

-- NPC EQUIPPED
DELETE FROM `creature_equip_template` WHERE `CreatureID`=@Entry AND `ID`=1;
INSERT INTO `creature_equip_template` VALUES (@Entry, 1, 11343, 0, 0, 18019); -- Black/Purple Staff, None

-- NPC TEXT
DELETE FROM `npc_text` WHERE `ID`=@Entry;
INSERT INTO `npc_text` (`ID`, `text0_0`) VALUES (@Entry, 'Good day $N. Beauregard Boneglitter at your service. I offer a vast array of gear enchantments for the aspiring adventurer.');

-- 名称汉化
DELETE FROM `creature_template_locale` WHERE `ID` = @Entry AND `locale` = 'zhCN';
INSERT INTO `creature_template_locale` (`entry`,`locale`,`Name`,`Title`,`VerifiedBuild`) VALUES (@Entry, 'zhCN', '骨闪', '附魔大师', 0);

-- 对话汉化
DELETE FROM `npc_text_locale` WHERE `ID` = @Entry AND `Locale` = 'zhCN';
INSERT INTO `npc_text_locale` (`ID`, `Locale`, `Text0_0`) VALUES (@Entry, 'zhCN', '你好，$N。 我是骨闪，随时为您服务。我为有抱负的冒险家提供一系列琳琅满目的装备附魔。');
