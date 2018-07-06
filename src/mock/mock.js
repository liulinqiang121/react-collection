import Mock from 'mockjs'

/**
 * 登陆接口
 */
Mock.mock('/users',{
    'name':'liulinqiang',
    'password':'liulinqiang',
})
Mock.mock('/homePage/getBaseData',
    {"yearData":
    {"time":"2018年总览（截至本月）","commitMoney":"0.00","repayMoney":"0.00","commitCaseCount":0,"repayCaseCount":0,"batchTimes":null,"receivableAge":null,"orgName":null},
    "monthData":[{"time":"上个月","commitMoney":"0.00","repayMoney":"0.00","commitCaseCount":0,"repayCaseCount":0,"batchTimes":null,"receivableAge":null,"orgName":null},
    {"time":"本月","commitMoney":"0.00","repayMoney":"0.00","commitCaseCount":0,"repayCaseCount":0,"batchTimes":null,"receivableAge":null,"orgName":null}],
    "quarterData":[{"time":"上季度","commitMoney":"0.00","repayMoney":"0.00","commitCaseCount":0,"repayCaseCount":0,"batchTimes":null,"receivableAge":null,"orgName":null},
    {"time":"本季度","commitMoney":"0.00","repayMoney":"0.00","commitCaseCount":0,"repayCaseCount":0,"batchTimes":null,"receivableAge":null,"orgName":null}],
    "batchTimesMoneyData":null,"batchTimesCountData":null,"receivableAgeMoneyData":null,"receivableAgeCountData":null,"subordinateData":null}
)
export default Mock