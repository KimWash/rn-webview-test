import styles from './Frame.module.css';
import chat from './assets/chat_bubble.png'
import chevron from './assets/Chevron left.png'
import edit from './assets/edit.png'
import avatar from './assets/Generic avatar.png'
import Icon from './assets/Icon.png'
import search from './assets/search.png'
import thumbsup from './assets/Thumbs up.png'
import verified from './assets/Verified Badge Blue.png'

export default function Find() {
  	return (
    		<div className={styles.div}>
      			<div className={styles.statusBarIphone}>
        				<div className={styles.frame}>
          					<div className={styles.time}>
            						<div className={styles.time1}>9:41</div>
          					</div>
          					<div className={styles.dynamicIslandSpacer} />
          					<div className={styles.levels}>
            						<img className={styles.cellularConnectionIcon} alt="" src="Cellular Connection.svg" />
            						<img className={styles.wifiIcon} alt="" src="Wifi.svg" />
            						<div className={styles.battery}>
              							<div className={styles.border} />
              							<img className={styles.capIcon} alt="" src="Cap.svg" />
              							<div className={styles.capacity} />
            						</div>
          					</div>
        				</div>
      			</div>
      			<div className={styles.frameParent}>
        				<div className={styles.frameGroup}>
          					<div className={styles.frameContainer}>
            						<div className={styles.parent}>
              							<div className={styles.div1}>컴퓨터공학부</div>
              							<div className={styles.div2}>공지사항</div>
            						</div>
            						<img className={styles.chevronLeftIcon} alt="" src={chevron}/>
          					</div>
          					<div className={styles.frameDiv}>
            						<div className={styles.editWrapper}>
              							<img className={styles.editIcon} alt="" src={edit} />
            						</div>
            						<div className={styles.editWrapper}>
              							<img className={styles.editIcon} alt="" src={search} />
            						</div>
          					</div>
        				</div>
        				<div className={styles.postListItem}>
          					<div className={styles.postUserProfile}>
            						<img className={styles.genericAvatarIcon} alt="" src={avatar} />
            						<div className={styles.userHandle}>
              							<div className={styles.user}>학과사무실</div>
              							<div className={styles.handleParent}>
                								<div className={styles.handle}>컴퓨터공학부</div>
                								<img className={styles.verifiedBadgeBlue} alt="" src={verified} />
              							</div>
            						</div>
            						<div className={styles.spacer} />
            						<img className={styles.moreVerticalIcon} alt="" src="More vertical.svg" />
          					</div>
          					<div className={styles.div3}>
            						<p className={styles.p}>2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에 신청하시기 바랍니다.</p>
            						<p className={styles.p}>가. 시행기간: 2024. 9. 23.(월) 09:00 ~ 9. 25.(수) 17:00</p>
            						<p className={styles.p}>나. 대상: 2024학년도 2학기 17학점 이상 수강신청자 중 수강능력 부족, 적성 부적합 등 부득이한 사유로 수강을 포기하려는 자</p>
            						<p className={styles.p}>다. 포기가능 과목 수: 1과목(3학점 이내, 포기 후 수강학점이 15학점 이상이어야 함)</p>
            						<p className={styles.p}>라. 신청방법</p>
          					</div>
          					<div className={styles.timestamp}>
            						<div className={styles.date}>2024. 10. 07.</div>
          					</div>
          					<div className={styles.line} />
          					<div className={styles.interactions}>
            						<div className={styles.retweets}>
              							<img className={styles.chatBubbleIcon} alt="" src={chat} />
              							<div className={styles.handle}>85</div>
            						</div>
            						<div className={styles.retweets}>
              							<img className={styles.thumbsUpIcon} alt="" src={thumbsup} />
              							<div className={styles.handle}>1,279</div>
            						</div>
          					</div>
        				</div>
        
      			</div>
    		</div>);
};
