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
Mock.mock('/casePage/getDropdown',
{"loanInstitution":[{"code":"高利贷","name":"高利贷"},{"code":"宜人贷","name":"宜人贷"},{"code":"招商银行","name":"招商银行"},{"code":"交通银行","name":"交通银行"},{"code":"现金快贷","name":"现金快贷"},{"code":"广发银行","name":"广发银行"},{"code":"小牛金融","name":"小牛金融"},{"code":"人人贷","name":"人人贷"},{"code":"安心贷","name":"安心贷"},{"code":"天天测试","name":"天天测试"},{"code":"建设银行","name":"建设银行"},{"code":"拍拍贷","name":"拍拍贷"},{"code":"民信贷","name":"民信贷"},{"code":"银行","name":"银行"},{"code":"工商银行","name":"工商银行"}],"productName":[{"code":"信贷3","name":"信贷3"},{"code":"招银1","name":"招银1"},{"code":"信用卡套现","name":"信用卡套现"},{"code":"消费金融","name":"消费金融"},{"code":"信贷","name":"信贷"},{"code":"消费金融1","name":"消费金融1"},{"code":"adsads","name":"adsads"}],"registeredAddress":[{"code":"赣州市","name":"赣州市"},{"code":"天水市","name":"天水市"},{"code":"揭阳市","name":"揭阳市"},{"code":"广东省","name":"广东省"},{"code":"未知","name":"未知"}],"caseArea":[{"code":"广西","name":"广西"},{"code":"湖北","name":"湖北"},{"code":"海南","name":"海南"},{"code":"北京","name":"北京"},{"code":"赣州","name":"赣州"},{"code":"深圳","name":"深圳"},{"code":"湖南","name":"湖南"},{"code":"云安","name":"云安"},{"code":"广东","name":"广东"},{"code":"四川","name":"四川"},{"code":"河南","name":"河南"}],"receivableAge":[{"code":"M0","name":"M0"},{"code":"M1","name":"M1"},{"code":"M2","name":"M2"},{"code":"M3","name":"M3"},{"code":"M4","name":"M4"},{"code":"M5","name":"M5"},{"code":"M6","name":"M6"},{"code":"M6+","name":"M6+"},{"code":"M-1","name":"未知"}],"caseStatus":[{"code":"1","name":"新案件"},{"code":"2","name":"已还款"},{"code":"3","name":"部分还款"},{"code":"4","name":"已撤案"},{"code":"5","name":"外访中"},{"code":"6","name":"跟进中"},{"code":"10","name":"承诺还款"},{"code":"11","name":"已到期"},{"code":"12","name":"智催已结束"},{"code":"13","name":"批量外呼催收中"},{"code":"14","name":"批量外呼已结束"}],"collectionStatus":[{"code":"0","name":"暂未进行催收"},{"code":"1","name":"智能短信催收"},{"code":"2","name":"智能语音催收"},{"code":"3","name":"智能对话催收"},{"code":"4","name":"人工电话催收"},{"code":"5","name":"申请外访"},{"code":"6","name":"外访中"},{"code":"7","name":"已外访继续跟进"},{"code":"8","name":"申请发函"},{"code":"9","name":"函件催收"},{"code":"10","name":"申请公安协催"},{"code":"11","name":"公安协催"},{"code":"-1","name":"催收终止"},{"code":"12","name":"智能催收结束"},{"code":"13","name":"预测式外呼"},{"code":"19","name":"预测式外呼结束"}],"bacthTimes":[{"code":"1","name":"一手"},{"code":"2","name":"二手"},{"code":"3","name":"三手"},{"code":"4","name":"四手"},{"code":"5","name":"五手"},{"code":"6","name":"六手"},{"code":"7","name":"七手"},{"code":"7+","name":"七手+"},{"code":"-1","name":"未知"}],"gender":[{"code":"0","name":"男"},{"code":"1","name":"女"},{"code":"2","name":"未知"}],"telStatus":[{"code":"0","name":"未知"},{"code":"1","name":"有效"},{"code":"2","name":"无效"}],"allotStatus":[{"code":"0","name":"未分配"},{"code":"1","name":"已分配"},{"code":"2","name":"前催状态（智能催收）"},{"code":"3","name":"预测式外呼"}],"batchAllotStatus":null,"caseLabel":null,"isExpiredLabel":null,"followType":[{"code":"1","name":"3天未跟进"},{"code":"2","name":"5天未跟进"},{"code":"3","name":"7天未跟进"}]}
)
export default Mock