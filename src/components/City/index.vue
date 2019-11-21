<template>
    <div class="city_body">
        <div class="city_list">
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li v-for="item in hotList" :key="item.id">{{item.nm}}</li>
                </ul>
            </div>
            <div class="city_sort" ref="city_sort">
                <div v-for="item in newCityList" :key="item.index">
                    <h2>{{ item.index}}</h2>
                    <ul>
                        <li v-for="m in item.list" :key="m.id">{{m.nm}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item,i) in newCityList" :key="item.index" @touchstart="handleToIndex(i)">{{ item.index}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "City",
        data(){
            return {
                newCityList : [],
                hotList: []
            }
        },
        mounted() {
            this.axios.get('/api/cityList').then( (res)=>{
                var msg = res.data.msg;
                if (msg === 'ok'){
                    var cities = res.data.data.cities;
                    //[ {index : 'A',list : [{ nm : ''}]} ]
                    var { newCityList,hotList } =  this.farmatCityList(cities);   //调用这个函数让城市列表按首字母排序
                    this.newCityList = newCityList;
                    this.hotList = hotList;
                    console.log(this.newCityList[7])
                }
            })
        },
        methods : {
            farmatCityList : function (cities) {
                var newCityList = [];
                var hotList = [];
                for(var i=0;i<cities.length;i++){
                    if(cities[i].isHot === 1){
                        hotList.push({nm : cities[i].nm, id : cities[i].id})
                    }
                }
                for(var i=0;i<cities.length;i++){
                    var firstLetter = cities[i].py.substring(0,1).toUpperCase();   // 取到首字母并转成大写
                    if(toCom(firstLetter)){   //新添加index索引
                        newCityList.push({index : firstLetter,list : [{ nm : cities[i].nm, id : cities[i].id}]})
                    }
                    else{   // 累加到已有的索引中
                        for(var j=0;j<newCityList.length;j++){
                            if( newCityList[j].index === firstLetter){
                                newCityList[j].list.push({ nm : cities[i].nm, id : cities[i].id})
                            }
                        }
                    }
                }

                // 给newCityList 排序
                newCityList.sort( (n1,n2)=>{
                    if(n1.index > n2.index){
                        return 1;
                    }
                    else if(n1.index < n2.index){
                        return -1;
                    }
                    else {
                        return 0;
                    }
                });

                function toCom(firstLetter) {   // 这个函数判断该首字母,是否已经存在于newCityList当中
                    for(var i=0;i<newCityList.length;i++){
                        if(newCityList[i].index === firstLetter){
                            return false;
                        }
                    }
                    return true;
                }
                return {newCityList,hotList}
            },
            handleToIndex : function (i) {
                var h2 = this.$refs.city_sort.getElementsByTagName('h2');
                this.$refs.city_sort.parentNode.scrollTop = h2[i].offsetTop;
            }
        }
    }
</script>

<style scoped>
    #content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
    .city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
    .city_body .city_list::-webkit-scrollbar{
        background-color:transparent;
        width:0;
    }
    .city_body .city_hot{ margin-top: 20px;}
    .city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_hot ul{}
    .city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
    .city_body .city_sort{}
    .city_body .city_sort div{ margin-top: 20px;}
    .city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
    .city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
    .city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
    .city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>