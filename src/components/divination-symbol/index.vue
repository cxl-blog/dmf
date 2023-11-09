<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { DivinationSymbolType } from '@/config/divination'

const props = withDefaults(
  defineProps<{
    offsetItemY?: number
    symbolName: DivinationSymbolType
    activeBgColor?: CSSProperties['background-color']
    inactiveBgColor?: CSSProperties['background-color']
  }>(),
  {
    offsetItemY: 8,
    activeBgColor: 'rgba(0, 0, 0, 0.7)',
    inactiveBgColor: '#f7f6f2'
  }
)
const offset_1 = `${props.offsetItemY * 1}px`
const offset_2 = `${props.offsetItemY * 2}px`
const offset_3 = `${props.offsetItemY * 3}px`
const offset_4 = `${props.offsetItemY * 4}px`
const offset_5 = `${props.offsetItemY * 5}px`
const offset_6 = `${props.offsetItemY * 6}px`
const offset_7 = `${props.offsetItemY * 7}px`
const offset_8 = `${props.offsetItemY * 8}px`
const offset_9 = `${props.offsetItemY * 9}px`
const offset_10 = `${props.offsetItemY * 10}px`
const offset_11 = `${props.offsetItemY * 11}px`
const defaultH = `${props.offsetItemY * 11}px`
</script>

<template>
  <div class="divination-symbol" :class="props.symbolName"> </div>
</template>

<style scoped lang="scss">
@import './symbol.scss';

$activeBgColor: v-bind(activeBgColor);
$inactiveBgColor: v-bind(inactiveBgColor);
// $inactiveBgColor: transparent;
$offset-1: v-bind(offset_1);
$offset-2: v-bind(offset_2);
$offset-3: v-bind(offset_3);
$offset-4: v-bind(offset_4);
$offset-5: v-bind(offset_5);
$offset-6: v-bind(offset_6);
$offset-7: v-bind(offset_7);
$offset-8: v-bind(offset_8);
$offset-9: v-bind(offset_9);
$offset-10: v-bind(offset_10);
$offset-11: v-bind(offset_11);

.divination-symbol {
  height: v-bind(defaultH);
  background-repeat: no-repeat;
  background-size: 100% $offset-1, 100% $offset-2, 100% $offset-3, 100% $offset-4, 100% $offset-5,
    100% $offset-6, 100% $offset-7, 100% $offset-8, 100% $offset-9, 100% $offset-10, 100% $offset-11;

  &.qian {
    @include qian;
  }

  &.kun {
    @include kun;
  }

  &.tun {
    @include tun;
  }

  &.meng {
    @include meng;
  }

  &.xu {
    @include xu;
  }

  &.song {
    @include song;
  }

  &.shi {
    @include shi;
  }

  &.bi {
    @include bi;
  }

  &.xiaochu {
    @include xiaochu;
  }

  &.lv {
    @include lv;
  }

  &.tai {
    @include tai;
  }

  &.fou {
    @include fou;
  }

  &.tongren {
    @include tongren;
  }

  &.dayou {
    @include dayou;
  }

  &.qian_15 {
    @include qian_15;
  }

  &.yu {
    @include yu;
  }

  &.sui {
    @include sui;
  }

  &.gu {
    @include gu;
  }

  &.lin {
    @include lin;
  }

  &.guan {
    @include guan;
  }

  &.shike {
    @include shike;
  }

  &.ben {
    @include ben;
  }

  &.bo {
    @include bo;
  }

  &.fu {
    @include fu;
  }

  &.wuwang {
    @include wuwang;
  }

  &.dachu {
    @include dachu;
  }

  &.yi {
    @include yi;
  }

  &.daguo {
    @include daguo;
  }

  &.kan {
    @include kan;
  }

  &.li {
    @include li;
  }

  &.xian {
    @include xian;
  }

  &.heng {
    @include heng;
  }

  &.dun {
    @include dun;
  }

  &.dazhaung {
    @include dazhuang;
  }

  &.jin {
    @include jin;
  }

  &.mingyi {
    @include mingyi;
  }

  &.jiaren {
    @include jiaren;
  }

  &.kui {
    @include kui;
  }

  &.jian {
    @include jian;
  }

  &.jie {
    @include jie;
  }

  &.sun {
    @include sun;
  }

  &.yi_42 {
    @include yi_42;
  }
  &.guai {
    @include guai;
  }

  &.gou {
    @include gou;
  }

  &.cui {
    @include cui;
  }

  &.sheng {
    @include sheng;
  }

  &.kun_47 {
    @include kun_47;
  }

  &.jing {
    @include jing;
  }

  &.ge {
    @include ge;
  }

  &.ding {
    @include ding;
  }

  &.zhen {
    @include zhen;
  }

  &.gen {
    @include gen;
  }

  &.jian_53 {
    @include jian_53;
  }

  &.guimei {
    @include guimei;
  }

  &.feng {
    @include feng;
  }

  &.lv_56 {
    @include lv_56;
  }

  &.xun {
    @include xun;
  }

  &.dui {
    @include dui;
  }

  &.huan {
    @include huan;
  }

  &.jie_60 {
    @include jie_60;
  }

  &.zhongfu {
    @include zhongfu;
  }

  &.xiaoguo {
    @include xiaoguo;
  }

  &.jiji {
    @include jiji;
  }

  &.weiji {
    @include weiji;
  }
}
</style>
