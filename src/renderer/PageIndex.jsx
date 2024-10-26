/* global electron */

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { MuConfigContext } from './MuConfigProvider';
import Layout from './Layout';
import bigThanks from './bigThanks';
import {
  EVENT_UPDATE_PROGRESS,
  EVENT_UPDATE_FINISHED,
  EVENT_CHECK_CLIENT_UPDATE,
  EVENT_RUN_MU,
} from '../config';

import './PageIndex.scss';

export default function PageIndex() {
  const defaultMsg = '检测更新...';
  const { muConfig } = useContext(MuConfigContext);
  const [updateInfo, setUpdateInfo] = useState({
    msg: defaultMsg,
    finished: true,
  });
  const [defaultServer, setDefaultServer] = useState(muConfig.servers?.[0]);

  const updateClient = () => {
    setUpdateInfo((preState) => ({
      ...preState,
      msg: defaultMsg,
      finished: false,
    }));

    electron?.ipcRenderer.on(EVENT_UPDATE_PROGRESS, (payload) => {
      console.log(`payload`, payload);
      setUpdateInfo(payload);
    });

    electron?.ipcRenderer.once(EVENT_UPDATE_FINISHED, () => {
      console.log(EVENT_UPDATE_FINISHED);
      setUpdateInfo((preState) => ({
        ...preState,
        finished: true,
      }));

      electron?.ipcRenderer.sendMessage(EVENT_RUN_MU, []);
    });

    electron?.ipcRenderer.sendMessage(EVENT_CHECK_CLIENT_UPDATE, []);
  };

  return (
    <Layout>
      <div className="p-4 mb-4 bg-white bg-jump">
        <div className="overlay" />
        <div className="container-fluid">
          <h1 className="display-5 fw-bold">{muConfig.siteSecondaryTitle}</h1>
          <p className="fs-4">{muConfig.siteDescription}</p>
          <hr />
          {!updateInfo.finished && (
            <div className="my-2 py-2 px-0 text-left text-primary text-break">
              {updateInfo.msg}
            </div>
          )}
          <div>
            <Link
              to="/"
              disabled={!updateInfo.finished}
              className="btn btn-outline-primary"
              onClick={updateClient}
            >
              启动游戏
            </Link>
            <Link to="/register" className="btn btn-link ms-2">
              快速注册
            </Link>
            <a
              href={muConfig.qqLink}
              className="btn btn-link ms-2"
              target="_blank"
              rel="noreferrer"
            >
              添加QQ群
            </a>
            <Link to="/setting" className="btn btn-link ms-2">
              更多设定
            </Link>
          </div>
        </div>
      </div>

      <div className="index-feature mt-4">
        <div className="box">
          <div className="overlay" />
          <h5>小猪一区</h5>
          <ul>
            <li>
              版本 s6 全扩展, 经典, 怀旧, 微变, 全职业平衡, 长久耐玩, 佛系养老
            </li>
            <li>
              经验 300 倍, 开放 300 次转生, 每转 200 点属性点, 杀怪计数,
              自动连击
            </li>
            <li>
              装备 +15, 物品全镶嵌, 三代翅膀, 武器进阶, 物品回收, 多页仓库,
              自定义称号头像
            </li>
            <li>
              新人积分, 在线随机抽奖, 杀怪随机积分奖励, 推广积分, BOSS 积分奖励
            </li>
            <li>各种事件活动, 多种副本地图, 散人天堂, 白嫖福音</li>
            <li>
              高清画质, 极致流畅, 内置外挂助手, 断线重连等功能, 内置宽屏补丁
            </li>
            <li>客户端实时 FPS, 实时 PING, 角色预览, 高级属性面板</li>
          </ul>
          <div style={{ paddingLeft: '2em' }} className="mt-1">
            <a href="/posts/[00]小猪奇迹怀旧服s4" target="_blank">
              查看更多设定
            </a>
          </div>
        </div>
        <div className="box">
          <div className="overlay" />
          <h5>掉落设置</h5>
          <ul>
            <li>
              美杜莎
              <ul>
                <li>掉落顶级装备, 杀死会获得大量积分</li>
                <li>
                  黑凤凰的羽毛(四代翅膀合成材料), 炽炎魔之魂(坐骑合成材料),
                  进阶宝石
                </li>
                <li>
                  美杜莎入侵事件中会随机在勇者大陆, 古战场, 亚特兰蒂斯出现
                </li>
              </ul>
            </li>
            <li>
              冰霜蜘蛛
              <ul>
                <li>掉落顶级装备, 杀死会获得大量积分</li>
                <li>掉落 黄金宝箱+4, 黄金宝箱+5, 七彩宝石</li>
                <li>
                  黑凤凰的羽毛(四代翅膀合成材料), 炽炎魔之魂(坐骑合成材料),
                  进阶宝石
                </li>
              </ul>
            </li>
            <li>
              魔王昆顿
              <ul>
                <li>
                  困顿入侵事件中会随机在勇者大陆, 古战场, 亚特兰蒂斯,
                  天空之城中随机出现
                </li>
                <li>掉落 黄金宝箱+4, 黄金宝箱+5, 大天使武器</li>
                <li>召唤卷轴, 进阶宝石,</li>
              </ul>
            </li>
            <li>
              炼狱魔王
              <ul>
                <li>掉落 +3 黄金宝箱</li>
              </ul>
            </li>
            <li>
              丛林召唤者
              <ul>
                <li>掉落 +3 黄金宝箱</li>
              </ul>
            </li>
            <li>
              其他小 BOSS 掉落 +1, +2 黄金宝箱
              <ul>
                <li>冰后</li>
                <li>魔鬼戈登</li>
                <li>魔王巴洛克</li>
                <li>海魔希特拉</li>
                <li>魔王扎坎</li>
                <li>炽炎魔</li>
                <li>天魔菲尼斯</li>
              </ul>
            </li>
            <li>黄金怪物掉落+1, +2, +3 黄金宝箱</li>
          </ul>
        </div>

        <div className="box">
          <div className="overlay" />
          <h5>常用操作</h5>
          <ul>
            <li>
              <code>F5</code> 关闭打开小地图
            </li>
            <li>
              <code>F9</code> 右键挂机
            </li>
            <li>
              <code>F10</code> 打开 3D
              模式，滚轮鼠标滚轮可以调整视野，按下鼠标滚轮可以旋转
            </li>
            <li>
              <code>F11</code> 关闭 3D 模式
            </li>
            <li>
              <code>F12</code> 隐藏游戏窗口到任务栏
            </li>
            <li>
              <code>/yd 地图名称</code> 移动地图
            </li>
            <li>
              <code>/post 内容</code> 发布公共信息
            </li>
            <li>
              <code>/ll 点数</code> 加力量
            </li>
            <li>
              <code>/mj 点数</code> 加敏捷
            </li>
            <li>
              <code>/tl 点数</code> 加体力
            </li>
            <li>
              <code>/zl 点数</code> 加智力
            </li>
            <li>
              <code>/tonglv 点数</code> 加统率
            </li>
            <li>
              <code>/xh</code> 洗红
            </li>
            <li>
              <code>/zz</code> 转职
            </li>
            <li>
              <code>/ck 编号</code> 切换仓库
            </li>
            <li>
              <code>/zs</code> 转生
            </li>
            <li>
              <code>/dszs</code> 大师转生
            </li>
            <li>
              <code>/qlbb</code> 清理背包
            </li>
            <li>
              <code>/xd</code> 洗点
            </li>
            <li>
              <code>/zs auto 力量 敏捷 体力 智力</code> 自动转生并自动加点
            </li>
            <li>
              <code>/huishou</code> 回收背包中支持回收的物品
            </li>
            <li>
              <code>/bs 怪物编码</code> 变身, 比如变身困顿 <code>/bs 275</code>
            </li>
            <li>
              <code>/jfdh</code> 积分兑换
            </li>
            <li>
              <code>/gg</code> 广告
            </li>
          </ul>
        </div>

        <div className="box">
          <div className="overlay" />
          <h5>入侵事件</h5>
          <ul>
            <li>白色魔法师入侵, 时间每天 19:00</li>
            <li>骷髅王入侵, 时间每天 19:15</li>
            <li>海魔希特拉入侵, 时间每天 19:30</li>
            <li>魔王扎坎入侵, 时间每天 19:45</li>
            <li>火龙王入侵, 时间每天 20:00</li>
            <li>黄金怪物入侵, 时间每天 20:15</li>
            <li>困顿入侵, 时间每天 20:30</li>
            <li>美杜莎入侵, 时间每天 20:45</li>
          </ul>
        </div>
      </div>

      <div className="mb-5 mt-4">
        <h4 className="index-title">特别感谢</h4>
        <div className="">
          {bigThanks.map((item) => (
            <div className="item" key={item.id}>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
