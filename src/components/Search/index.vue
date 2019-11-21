<template>
    <div class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="iconfont icon-sousuo"></i>
                <input type="text" v-model="message">
            </div>
        </div>
        <div class="search_result">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="item in moviesList">
                    <div class="img"><img :src="item.img | setWH('128.180')"></div>
                    <div class="info">
                        <p><span>{{ item.nm}}</span><span>8.5</span></p>
                        <p>{{ item.enm }}</p>
                        <p>{{ item.cat }}</p>
                        <p>{{item.rt}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Search",
        data(){
            return {
                message : "",
                moviesList : [],
                cinemasList : []
            }
        },
        methods : {
            cancelRequest(){   // 一旦触发就停止上一次的请求, axios封装的一个方法
                if(typeof this.source === 'function'){
                    this.source('终止请求')
                }
            }
        },
        watch : {
            message(newVal){
                var that = this;
                this.cancelRequest();

                this.axios.get('/api/searchList?cityId=10&kw='+newVal,{
                    cancelToken : new this.axios.CancelToken(function executor(c) {
                        that.source = c;
                    })
                }).then( (res)=>{
                    console.log(newVal)
                    var msg = res.data.msg;
                    var movies = res.data.data.movies;
                    if (msg && movies){
                        this.moviesList = res.data.data.movies.list;
                        this.cinemasList = res.data.data.cinemas.list;
                    }
                }).catch((err) =>{
                    if(this.axios.isCancel(err)){
                        console.log('Request candeled',err.message);   //请求如果被取消这里返回的是取消的message
                    }else{
                        console.log(err)
                    }
                })

            }
            // message(newVal){
            //     clearTimeout(t);
            //     var mythis = this;
            //     var t = setTimeout(function () {
            //         mythis.axios.get('/api/searchList?cityId=10&kw='+newVal).then( (res)=>{
            //             var msg = res.data.msg;
            //             var movies = res.data.data.movies;
            //             if (msg && movies){
            //                 mythis.moviesList = res.data.data.movies.list;
            //                 mythis.cinemasList = res.data.data.cinemas.list;
            //             }
            //         })
            //     },1000)
            // }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    #content .search_body{ flex:1; overflow:auto;}
    .search_body .search_input{ padding: 8px 10px; background-color: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
    .search_body .search_input_wrapper{ padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background-color: #fff; display: flex; line-height: 20px;}
    .search_body .search_input_wrapper i{font-size: 16px; padding: 4px 0;}
    .search_body .search_input_wrapper input{ border: none; font-size: 13px; color: #333; padding: 4px 0; outline: none; margin-left: 5px; width:100%;}
    .search_body .search_result{}
    .search_body .search_result h3{ font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
    .search_body .search_result ul{}
    .search_body .search_result li{ border-bottom:1px #c9c9c9 dashed; padding: 10px 15px; box-sizing:border-box; display: flex;}
    .search_body .search_result .img{ width: 60px; float:left; }
    .search_body .search_result .img img{ width: 100%; }
    .search_body .search_result .info{ float:left; margin-left: 15px; flex:1;}
    .search_body .search_result .info p{ height: 22px; display: flex; line-height: 22px; font-size: 12px;}
    .search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){ font-size: 18px; flex:1; }
    .search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){ font-size: 16px; color:#fc7103;}
</style>