// export const betStatus = {
// 	'1': 'bet', // 允许押注
// 	'2': 'lock', // 停止押注
// 	'3': 'win', // 已结束 胜
// 	'31': 'up', 	// 赔率上升
// 	'4': 'lose', // 已结束 负
// 	'41': 'down', // 赔率下降
// 	'5': 'disabled' // 未抓取到赔率
// }

export const matchType = {
	'1': 1, // 今日
	'2': 2, // 滚盘
	'3': 3, // 赛前
	'4': 4, // 冠军
	'5': 5  // 已结束
}

export const winOnly = 3 // 独赢代号

export const STAGE = { // 比赛的阶段
	final: 'Final',
	r1: 'Fist Half'
	// '1st': '上半场',
	// r2: '第二局',
	// r3: '第三局',
	// r4: '第四局',
	// q1: '第一场',
	// q2: '第二场',
	// q3: '第三场',
	// q4: '第四场',
	// map1: '地图1',
	// map2: '地图2',
	// map3: '地图3',
	// map4: '地图4'
}

// 比赛相关
export const MATCH = {
	BET_KEY: '_id', // 用那个字段匹配
	DUYING_KEY: 'odd_game_type_id', // 独赢id字段名
	DUYING_VALUE: 3, // 独赢
	INIT_CHUAN_LEN: 2
	// MATCH_TYPES: { // tab id
	// 	'1': 1, // 今日
	// 	'2': 2, // 滚盘
	// 	'3': 3, // 赛前
	// 	'4': 4, // 冠军
	// 	'5': 5  // 已结束
	// }
}

// 赔率相关
export const ODD = {
	INIT_STATUS: 1,
	STATUS: {
		'1': 'bet', // 允许押注
		'2': 'lock', // 停止押注
		'3': 'win', // 已结束 胜
		'31': 'up', 	// 赔率上升
		'4': 'lose', // 已结束 负
		'41': 'down', // 赔率下降
		'5': 'disabled' // 未抓取到赔率
	}
}

// 用户相关
export const USER = {
	INIT_BALANCE: 0
}

// 投注相关
export const BET = {
	CHUAN_SPLIT: '_' // 串关分隔符
}