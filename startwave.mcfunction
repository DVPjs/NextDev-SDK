# Reset tracking
scoreboard players set @a z_spawned 0
scoreboard players set @a z_killed 0

# Announce new wave
title @a title {"rawtext":[{"text":"Wave "},{"score":{"name":"@a","objective":"wave"}}]}

# Spawn zombies equal to wave number * 5
execute as @a run summon zombie ~ ~1 ~
execute as @a[scores={wave=2..}] run summon zombie ~ ~1 ~
execute as @a[scores={wave=3..}] run summon zombie ~ ~1 ~
execute as @a[scores={wave=4..}] run summon zombie ~ ~1 ~
# You can extend or randomize this with more logic

# Update spawned count (5 * wave)
scoreboard players operation @a z_spawned += @a wave
scoreboard players operation @a z_spawned *= @a wave

# Equip zombies based on wave
execute as @e[type=zombie,tag=!geared] if score @a wave matches 1 run replaceitem entity @s slot.weapon.mainhand 1 wooden_pickaxe
execute as @e[type=zombie,tag=!geared] if score @a wave matches 2 run replaceitem entity @s slot.weapon.mainhand 1 stone_sword
execute as @e[type=zombie,tag=!geared] if score @a wave matches 3 run replaceitem entity @s slot.weapon.mainhand 1 iron_sword
execute as @e[type=zombie,tag=!geared] if score @a wave matches 4 run replaceitem entity @s slot.weapon.mainhand 1 diamond_sword
execute as @e[type=zombie,tag=!geared] run tag @s add geared
