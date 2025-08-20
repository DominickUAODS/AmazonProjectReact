import { useNavigate, useLocation } from 'react-router-dom';
import styles from './StarsComments.module.css';
import commonStyles from "../common.module.css";
import { useMemo, useState } from 'react';
import SortSelect from './SortSelect';
import SortingByStars from './SortingByStars';
import OneComment, { type CommentType } from './OneComment';

const comments: CommentType[] = [
    // 1. Всё кроме images
    {
      userName: "Alice Cooper",
      userImage: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
      stars: 5,
      title: "Perfect quality",
      content: "Really loved the fabric and stitching. Worth every penny!",
      published: "12.06.2024",
      isHelpful: true,
      tags: ["Excellent", "Durable"],
      helPeople: 0,
    },
    // 2. Оригинал (ничего не меняем)
    {
      userName: "Louisa Hines",
      helPeople: 3,
      title: "It's true to size and has pockets",
      stars: 4,
      content:
        "I absolutely adore this dress. I've gotten numerous compliments, with people saying I look stylish. It's incredibly comfortable! I wore it to my granddaughter's graduation and to church.",
      userImage: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
      published: "31.05.2024",
      isHelpful: false,
      tags: ["High quality", "Actual price"],
      image: [
        "./public/img/714c3df0e8b2044e52526d711b53d08441a2951c.jpg",
        "./public/img/714c3df0e8b2044e52526d711b53d08441a2951c.jpg",
        "./public/img/714c3df0e8b2044e52526d711b53d08441a2951c.jpg",
        "./public/img/714c3df0e8b2044e52526d711b53d08441a2951c.jpg",
        "./public/img/714c3df0e8b2044e52526d711b53d08441a2951c.jpg",
        "./public/img/714c3df0e8b2044e52526d711b53d08441a2951c.jpg",
      ],
    },
    // 3. Только звёзды
    {
      userName: "Mark Wayne",
      userImage: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
      stars: 2,
      published: "01.07.2024",
      isHelpful: false,
    },
    // 4. Звёзды + title
    {
      userName: "Helen Brooks",
      userImage: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
      stars: 5,
      title: "Amazing dress!",
      published: "05.07.2024",
      isHelpful: true,
      helPeople: 10,
    },
    // 5. Звёзды + тэги
    {
      userName: "Oliver Twist",
      userImage: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
      stars: 3,
      tags: ["Trendy", "Comfortable"],
      published: "07.07.2024",
      isHelpful: false,
      helPeople: 1,
    },
    // 6. Только контент
    {
      userName: "Emily White",
      userImage: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
      stars: 4,
      content: "Nice but a little bit overpriced for the quality.",
      published: "10.07.2024",
      isHelpful: false,
    },
    // 7. Звёзды + тэги
    {
      userName: "Jack Black",
      userImage: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
      stars: 5,
      tags: ["Best purchase", "Highly recommend"],
      published: "15.07.2024",
      isHelpful: true,
      helPeople: 25,
    },
    // 8. Title + тэги
    {
      userName: "Sophia Loren",
      userImage: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
      stars: 3,
      title: "Stylish but small",
      tags: ["Runs small", "Color fades"],
      published: "20.07.2024",
      isHelpful: false,
    },
    // 9. Title + content
    {
      userName: "Chris Pratt",
      userImage: "./public/img/43c4226b254b01eee447756117e18fc15b48c924.jpg",
      stars: 4,
      title: "Great fit",
      content: "Fits really well, just the fabric feels a little thin.",
      published: "25.07.2024",
      isHelpful: true,
    },
  ];

export default function StartsComments() {


    const [starFilter, setStarFilter] = useState<number | null>(null); // null = All
    const [sortType, setSortType] = useState<"top" | "recent" | "older">("recent");
  
    const filteredAndSorted = useMemo(() => {
      let result = [...comments];
  

      if (starFilter !== null) {
        result = result.filter(c => Math.ceil(c.stars) === starFilter);
      }
  

      switch (sortType) {
        case "top":
          result.sort((a, b) => (b.helPeople ?? 0) - (a.helPeople ?? 0));
          break;
        case "recent":
          result.sort((a, b) => {
            const [da, ma, ya] = a.published.split(".").map(Number);
            const [db, mb, yb] = b.published.split(".").map(Number);
            return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
          });
          break;
        case "older":
          result.sort((a, b) => {
            const [da, ma, ya] = a.published.split(".").map(Number);
            const [db, mb, yb] = b.published.split(".").map(Number);
            return new Date(ya, ma - 1, da).getTime() - new Date(yb, mb - 1, db).getTime();
          });
          break;
      }
  
      return result;
    }, [comments, starFilter, sortType]);


    return (
      <div className={styles.sc}>
        <div className={styles.sorting}>
           <SortingByStars active={starFilter} onChange={setStarFilter}/>
           <SortSelect value={sortType} onChange={setSortType}/>
        </div>
        <div className={styles.comments}>
            <div className={styles.commentsButton}>
                <button className={commonStyles.secondaryButton}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 3.45703V12.2" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M24.5001 13.957H15.7571" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3.5 13.957H12.243C13.216 13.957 14 14.741 14 15.714V24.457" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Create review
                </button>
            </div>

            <div className={styles.cBlock}>
                    {filteredAndSorted.map((c, i) => (
                        <OneComment key={i} {...c} />
                    ))}

            </div>

        </div>
      </div>
    );
  }