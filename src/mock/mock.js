import Mock from 'mockjs'

/**
 * 登陆接口
 */
Mock.mock('/users',{
    'name':'liulinqiang',
    'password':'liulinqiang',
})
Mock.mock('/homePage/getBaseData',
{
    "yearData":
         {"time":"2018年总览（截至本月）","commitMoney":"2434.59","repayMoney":"272.66","commitCaseCount":315,"repayCaseCount":78,"batchTimes":null,"receivableAge":null,"orgName":null},
    "monthData":
       [
         {"time":"本月","commitMoney":"152.81","repayMoney":"213.12","commitCaseCount":42,"repayCaseCount":1},
         {"time":"上个月","commitMoney":"165.14","repayMoney":"0.00","commitCaseCount":4,"repayCaseCount":0}
       ],
    "quarterData": 
       [
         {"time":"本季度","commitMoney":"152.81","repayMoney":"213.18","commitCaseCount":42,"repayCaseCount":20,},
         {"time":"上季度","commitMoney":"2181.50","repayMoney":"52.04","commitCaseCount":242,"repayCaseCount":76,}
       ]
    }
)
export default Mock