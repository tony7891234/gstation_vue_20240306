// 格式化一个玩法的具体玩法种类
import Vue from 'vue'
export const formatGameType = function(teams = [], group_id = 3, tag = '-1', team_id = '1') {
	switch(group_id) {
		case 1: // 让球
		case 5: // 让球上半场
			// return teams[team]
			if (team_id / 1 === 1) { // 主队让, 1主队让，2客队
				return teams[0].team_name + ' '  + tag
			} else { // 客队让球
				return teams[2].team_name + ' ' + tag
			}
		case 2: // 进球大小
		case 6: // 进球大小/上半场
			return (team_id === 1 ? Vue.prototype.$t('match.detail.big') : Vue.prototype.$t('match.detail.small')) + ' ' + tag
		case 3: // 独赢
		case 7: // 独赢上半场
			return teams[Math.abs(tag / 1 - 1)].team_name
		case 4: // 进球单双
		case 8: // 进球单双上半场
			return tag / 1 === 1 ? Vue.prototype.$t('match.detail.odd') : Vue.prototype.$t('match.detail.even') // 1奇数，2偶数
		case 9: // 总进球数上半场
		case 11: // 总进球进球
			return tag
		case 10: // 波胆上半场
		case 12: // 波胆
			return tag
		case 13: // 半全场
			const tSign = tag.split('/')
			return getTeamName(teams, tSign[0]) + '/' + getTeamName(teams, tSign[1])
			break;
		case 14: // 净胜球数
			return tag	
		default:
			return tag
	}
}

function getTeamName(teams, sign) {
	let index = 0
	switch(sign / 1) {
		case 1:
		index = 0
		break
		case 0:
		index = 1
		break
		case 2: 
		index = 2
		break
	}
	return teams[sign].team_name
}