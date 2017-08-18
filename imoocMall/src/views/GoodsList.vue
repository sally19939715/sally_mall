<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortGoods">Price
              <svg class="icon icon-arrow-short" v-bind:class="{'sort-up':!sortFlag}">
                <use xlink:href="#icon-arrow-short"></use>
              </svg>
            </a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="setFilterPop()">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':setClickState=='All'}" @click="setPriceFilter('All')">All</a></dd>
                <dd v-for="(price,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFilter(index)" v-bind:class="{'cur':setClickState==index}">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn-m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                  <img src="./../assets/loading-spinning-bubbles.svg" v-if="loading">
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="md-overlay" v-show="overlayFlag" @click="closePop"></div>
      <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
        <p slot="message">
          请先登录，否则无法加入到购物车
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:void(0);" @click="closeModal">关闭</a>
        </div>
      </modal>
      <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>加入购物车成功！</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:void(0);" @click="mdShowCart = false">继续购物</a>
          <router-link class="btn btn--m" href="javascript:void(0);" to="/cart">查看购物车</router-link>
        </div>
      </modal>
      <nav-footer></nav-footer>
    </div>
</template>
<style>
  .filter-price dt,.filter-price dd{
    text-align: left;
  }
  .btn:hover{
    background-color: #ffe5e6;
    transition: all .3s ease-out;
  }
  .sort-up{
    transform: rotate(180deg);
    transition: all .3s ease-out;
  }
  .icon-arrow-short{
    transition: all .3s ease-out;
  }
</style>
<script>

  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import './../assets/css/login.css'
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'
  import axios from 'axios'
  import Modal from './../components/Modal.vue'

  export default{
        data(){
            return {
               goodsList:[],
               priceFilter:[{
                   startPrice:'0.00',
                   endPrice:'100.00'
               },{
                   startPrice:'100.00',
                   endPrice:'500.00'
               },{
                   startPrice:'500.00',
                   endPrice:'1000.00'
               },{
                   startPrice:'1000.00',
                   endPrice:'5000.00'
               }],
               sortFlag:true,
               setClickState:'All',
               filterBy:false,
               overlayFlag:false,
               page:1,
               pageSize:8,
               busy:true,
               loading:false,
               mdShow:false,
               mdShowCart:false

//          setClickState==index
            }

        },
        components:{
                NavHeader:NavHeader,
                NavFooter:NavFooter,
                NavBread:NavBread,
                Modal
        },
        mounted:function(){
            this.getGoodsList();
        },
        methods:{
           getGoodsList(flag){
              var param = {
                  page:this.page,
                  pageSize:this.pageSize,
                  sort:this.sortFlag?1:-1,
                  priceLevel:this.setClickState
              };
              this.loading = true;
              axios.get('/goods/list',{params:param}).then(result=>{
//                  console.log(result);
                  let res = result.data;
                  this.loading = false;
                  if(res.status == '0'){
                      if(flag){
                          if(res.result.count == 0){
                              this.busy = true
                          }else{
                              this.busy = false
                          }
                          this.goodsList = this.goodsList.concat(res.result.list);
                      }else{
                          this.goodsList = res.result.list;
                          this.busy = false;
                      }
//
                  }else{
                      this.goodsList = [];
                  }

              })
           },
          sortGoods(){
               this.sortFlag = !this.sortFlag;
               this.page = 1;
               this.getGoodsList();
          },
          loadMore(){
              this.busy = true;
              setTimeout(()=>{
                  this.page++;
                  this.getGoodsList(true);
              },500);
          },
          setFilterPop(){
            this.filterBy = true;
            this.overlayFlag = true;

          },
          closePop(){
            this.filterBy = false;
            this.overlayFlag = false;
          },
          setPriceFilter(index){
              this.setClickState = index;
              this.page = 1;
              this.getGoodsList();
          },
          addCart(productId){
              axios.post('/goods/addCart',{
                  productId:productId
              }).then((res)=>{
                  if(res.data.status == '0'){
                      this.mdShowCart = true;
                      this.$store.commit('updateCartCount',1);
                  }else{
                      this.mdShow = true
                  }
              })
          },
          closeModal(){
            this.mdShow = false;
            this.mdShowCart = false;
          }
        }
    }
</script>
