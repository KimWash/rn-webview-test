import styles from './Frame.module.css';
import chat from './assets/chat_bubble.png'
import chevron from './assets/Chevron left.png'
import edit from './assets/edit.png'
import avatar from './assets/Generic avatar.png'
import Icon from './assets/Icon.png'
import search from './assets/search.png'
import thumbsup from './assets/Thumbs up.png'
import verified from './assets/Verified Badge Blue.png'
import { Link, useNavigate } from 'react-router-dom';
import { platformResolver } from './PlatformResolver';
import { MessageEvent, MessageManager, useMessageManager } from './MessageManager';
import { useEffect, useState } from 'react';

const fetchList = async (id, pw) => {
  return fetch('http://192.168.1.146:8888/list', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    credentials: 'include'
  })
}


export default function List() {
  const navigate = useNavigate();

  const messageManager = useMessageManager();

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchList().then(async res => {
      messageManager.sendMessage(MessageEvent.Log, res.ok)
      if (res.ok) {
        setList(await res.json())
        setLoading(false)
      }
    }).catch(err => messageManager.sendMessage(MessageEvent.Log, err.message))
  }, [])


  return (
    <div className={styles.div}>

      <div className={styles.frameParent}>
        <div className={styles.frameGroup}>
          <div className={styles.frameContainer}>
            <div className={styles.parent}>
              <div className={styles.div1}>컴퓨터공학부</div>
              <div className={styles.div2}>공지사항</div>
            </div>
            <img className={styles.chevronLeftIcon} alt="" src={chevron} />
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
        {
          !loading &&
          list.map(item => <div className={styles.postListItem} onClick={() => {
            messageManager.sendMessage(MessageEvent.Log, 'test')
            if (platformResolver(navigator.userAgent.toLowerCase()).isWebView) messageManager.sendMessage(MessageEvent.Navigation, { path: 'detail' })
            else navigate('detail')
          }}>
            <div className={styles.postUserProfile}>
              <img className={styles.genericAvatarIcon} alt="" src={avatar} />
              <div className={styles.userHandle}>
                <div className={styles.user}>{item.author}</div>
                <div className={styles.handleParent}>
                  <div className={styles.handle}>{item.authorOrg}</div>
                  {
                    item.verified &&
                    <img className={styles.verifiedBadgeBlue} alt="" src={verified} />
                  }
                </div>
              </div>
              <div className={styles.spacer} />
              <img className={styles.moreVerticalIcon} alt="" src="More vertical.svg" />
            </div>
            <div className={styles.div3}>
              <p className={styles.p}>{item.content}</p>
            </div>
            <div className={styles.timestamp}>
              <div className={styles.date}>{item.date}</div>
            </div>
            <div className={styles.line} />
            <div className={styles.interactions}>
              <div className={styles.retweets}>
                <img className={styles.chatBubbleIcon} alt="" src={chat} />
                <div className={styles.handle}>{item.comments}</div>
              </div>
              <div className={styles.retweets}>
                <img className={styles.thumbsUpIcon} alt="" src={thumbsup} />
                <div className={styles.handle}>{item.likes}</div>
              </div>
            </div>
          </div>)
        }



      </div>
    </div>);
};
