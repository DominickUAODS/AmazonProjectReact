
import styles from './CreateReview.module.css'
import modalStyles from "../AdminComp/Products/CreateEditCategoryModal.module.css"
import { useState, useRef, useEffect } from 'react';
import commonStyles from '../common.module.css';
import photo_styles from "../AdminComp/ProductByCategory/GeneralInfo.module.css"
import type { CommentType } from '../ProductPageComp/OneComment';
import { reviewTagOptions } from '../../types/ReviewTagOptions';
import PFTag from '../ProductPageComp/PFTag';
import { generateCloudinarySignature, type CloudinaryParams } from '../Helpers/Signature';
import { useParams } from 'react-router-dom';
import type { ReviewCreateDto, ReviewTagKey } from '../../types/ReviewFromData';
  
interface CreateReview {
    show: boolean;
    onClose: () => void;
    onCreate?: (data: CommentType) => void;
    comment?: CommentType | null; 
}







export default function CreateReview({show,onClose, onCreate, comment}:CreateReview) {
    const [description, setDescription] = useState("");
    const { id } = useParams<{ id: string }>();
    const [stars, setStars] = useState<number>(0);
    const [title, setTitle] = useState("");
    const [activeTags, setActiveTags] = useState<ReviewTagKey[]>([]);
    const [images, setImages] = useState<string[]>(comment?.rewiew_images || []);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const API_SERVER = import.meta.env.VITE_API_SERVER;
    const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
	  const CLOUD_API = import.meta.env.VITE_CLOUD_API;
	  const CLOUD_SECRET = import.meta.env.VITE_CLOUD_SECRET;
    const tags = reviewTagOptions;

    

    const handleSubmit = async () => {
      if (stars === 0) {
        alert("Please fill in all required fields");
        return;
      }
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        alert("User not found");
        return;
      }
    
      const user = JSON.parse(userStr);
      const userId = user.id; 
      console.log(userId)
      const productId = id;
    
      const payload: ReviewCreateDto = {
        user_id: userId!,
        product_id: productId!,
        stars,
        title,
        content: description,
        published: new Date().toISOString(),
        rewiew_tags: activeTags.map(tag => parseInt(tag, 10)),
        rewiew_images: images,
      };

      console.log("Payload to send:", JSON.stringify(payload, null, 2));
    
      try {
        let res: Response;
    
        if (comment) {
          res = await fetch(`${API_SERVER}/reviews/${comment.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ ...payload, id: comment.id }), 
          });
        } else {
          
          res = await fetch(`${API_SERVER}/reviews`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(payload),
          });
        }
    
        if (!res.ok) throw new Error("Failed to save review");
    
        const data = await res.json();
        if (onCreate) onCreate(data);
    
        onClose();
      } catch (err) {
        console.error(err);
        alert("Error saving review");
      }
    };
    
  useEffect(() => {
      if (comment) {
          setStars(comment.stars || 0);
          setDescription(comment.content || "");
          setTitle(comment.title || "");
          setActiveTags(comment.rewiew_tags as ReviewTagKey[] || []);
          setImages(comment.rewiew_images || []);
      } else {
          setStars(0);
          setDescription("");
          setTitle("");
          setActiveTags([]);
          setImages([]);
      }
  }, [comment]);
    
      if (!show) return null;
    
      const handleStarClick = (index: number) => {
        setStars(index + 1); // кликаем на 0-индекс => выставляем 1 звезду и т.д.
      };


      const handleTagClick = (tag: ReviewTagKey) => {
        setActiveTags((prev) =>
          prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
      };


      const renderStars = () => {
        const totalStars = 5;
        const starsArray = Array.from({ length: totalStars }, (_, i) => i);
        return (
          <div className={styles.crModalMainStars}>
            {starsArray.map((i) => (
              <div
                key={i}
                onClick={() => handleStarClick(i)}
                style={{ cursor: "pointer", display: "inline-block", marginRight: 4 }}
              >
                {i < stars ? (
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M25.6602 68.0202C22.9202 70.0002 19.2602 67.3402 20.3002 64.1202L24.7202 50.4802C25.3402 48.5602 24.6602 46.4602 23.0202 45.2802L11.4202 36.8602C8.68021 34.8802 10.1002 30.5602 13.4602 30.5602H27.8002C29.8202 30.5602 31.6002 29.2602 32.2202 27.3402L36.6402 13.7002C37.6802 10.4802 42.2202 10.4802 43.2802 13.7002L47.7002 27.3402C48.3202 29.2602 50.1202 30.5602 52.1202 30.5602H66.4602C69.8402 30.5602 71.2402 34.8802 68.5002 36.8602L56.9002 45.2802C55.2602 46.4602 54.5802 48.5602 55.2002 50.4802L59.6202 64.1202C60.6602 67.3402 56.9802 70.0002 54.2602 68.0202L43.4002 59.3202C41.7602 58.0002 39.4402 57.9602 37.7402 59.1802L25.6002 68.0202H25.6602Z"
                      fill="#0E2042"
                      stroke="#0E2042"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M25.6602 68.0202C22.9202 70.0002 19.2602 67.3402 20.3002 64.1202L24.7202 50.4802C25.3402 48.5602 24.6602 46.4602 23.0202 45.2802L11.4202 36.8602C8.68021 34.8802 10.1002 30.5602 13.4602 30.5602H27.8002C29.8202 30.5602 31.6002 29.2602 32.2202 27.3402L36.6402 13.7002C37.6802 10.4802 42.2202 10.4802 43.2802 13.7002L47.7002 27.3402C48.3202 29.2602 50.1202 30.5602 52.1202 30.5602H66.4602C69.8402 30.5602 71.2402 34.8802 68.5002 36.8602L56.9002 45.2802C55.2602 46.4602 54.5802 48.5602 55.2002 50.4802L59.6202 64.1202C60.6602 67.3402 56.9802 70.0002 54.2602 68.0202L43.4002 59.3202C41.7602 58.0002 39.4402 57.9602 37.7402 59.1802L25.6002 68.0202H25.6602Z"
                      stroke="#0E2042"
                      strokeOpacity="0.5"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        );
      };


      const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          const timestamp = Math.floor(Date.now() / 1000);
          const publicId = crypto.randomUUID();
      
          const params: CloudinaryParams = { timestamp, public_id: publicId };
          const signature = generateCloudinarySignature(params, CLOUD_SECRET);
      
          const formData = new FormData();
          formData.append('file', file);
          formData.append('public_id', publicId);
          formData.append('timestamp', timestamp.toString());
          formData.append('api_key', CLOUD_API);
          formData.append('signature', signature);
      
          setUploading(true);
      
          try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
              method: 'POST',
              body: formData,
            });
      
            if (!response.ok) throw new Error('Upload failed');
      
            const result = await response.json();
            setImages((prev) => [...prev, result.secure_url]);
            setUploading(false);
          } catch (err) {
            console.error(err);
            setUploading(false);
          }
        }
      };
      

      const handleAddPhotoClick = () => {
        fileInputRef.current?.click();
      };

    return (
        <div className={modalStyles.overlay}>
            <div className={`${modalStyles.modal} ${styles.my_modal}`}>
                <div className={styles.crModal}>
                    <div>
                        <div className={styles.crModalTitle}>
                            {!comment ? <span>Create Review</span> : <span>Edit Review</span>}
                        </div>
                        <div className={styles.crModalMain}>
                            <div className={styles.crModalMainStars}>
                                {renderStars()}
                            </div>

                            <fieldset className={`${commonStyles.inputWrapper} ${styles.inputName}`}>
                                <legend>Title</legend>
                                <input
                                    type="text"
                                    placeholder="Your opinion in a nutshell..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className={`${commonStyles.inputWrapper2} ${modalStyles.inputDesc}`}>
                                <legend>Description</legend>
                                <textarea
                                    maxLength={300}
                                    placeholder="Tell us more about your experiences..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <div className={modalStyles.wordCounter}>
                                {description.length}/300
                                </div>
						    </fieldset>


                            <div className={styles.tags}>
                                <span className={styles.tagsSpan}>Tags</span>
                                <div className={styles.tagsCont}>
                                {tags.map((tag) => (
                                    <PFTag
                                        key={tag.key}
                                        title={tag.title}
                                        isActive={activeTags.includes(tag.key)}
                                        onClick={() => handleTagClick(tag.key)}
                                    />
                                ))}

                                </div>
                            </div>

                            <div className={photo_styles.photoBlock}>
                                <div className={photo_styles.photoInfo}>
                                    <div className={photo_styles.photoSpan}>
                                        <span className={styles.tagsSpan}>Photos</span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"cursor":"pointer"}}>
                                            <path d="M11.9992 20.9632C16.9498 20.9632 20.9632 16.9498 20.9632 11.9992C20.9632 7.04848 16.9498 3.03516 11.9992 3.03516C7.04848 3.03516 3.03516 7.04848 3.03516 11.9992C3.03516 16.9498 7.04848 20.9632 11.9992 20.9632Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M14.1783 15.252L13.5723 15.708C12.6783 16.38 11.4063 15.744 11.4063 14.628V11.19C11.4063 11.028 11.2203 10.968 11.1003 11.076C10.6563 11.466 10.6983 11.556 9.82227 11.976" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M12.1927 9.05471C12.1207 9.34871 11.8747 9.58871 11.5807 9.65471C11.2567 9.72671 10.9567 9.61271 10.7647 9.39671C10.5967 9.20471 10.5187 8.94071 10.5787 8.65871C10.6447 8.35871 10.8847 8.11271 11.1787 8.04071C11.7967 7.89071 12.3367 8.43671 12.1927 9.05471Z" fill="#0E2042"/>
                                        </svg>
                                    </div>
                                    <span className={styles.counter}>{comment?.rewiew_images?.length} / 10</span>
                                </div>

                                {!comment ? (
                                      
                                        <div className={photo_styles.gallery}>
                                              {/* Скрытый input для выбора файла */}
                                                <input
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                />

                                            <div className={photo_styles.addPhoto} onClick={() => fileInputRef.current?.click()}>
                                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M24 5.92773V20.9157" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M41.9997 23.9277H27.0117" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M6 23.9277H20.988C22.656 23.9277 24 25.2717 24 26.9397V41.9277" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </div>
                                            {images.map((url, index) => (
                                                    <div
                                                    key={index}
                                                    className={photo_styles.photoWrapper}
                                                    style={{ width: 118, height: 118 }}
                                                    >
                                                    <img
                                                        src={url}
                                                        alt={`product-${index}`}
                                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                    />
                                                    </div>
                                            ))}
                                        </div>
                                    ):(
                                        <div className={photo_styles.gallery} >
                                             {/* Скрытый input для выбора файла */}
                                             <input
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                />
                                                {images?.map((url, index) => (
                                                    <div
                                                    key={index}
                                                    className={photo_styles.photoWrapper}
                                                    style={{ width: 118, height: 118 }}
                                                    >
                                                    <img
                                                        src={url}
                                                        alt={`product-${index}`}
                                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                    />
                                                    </div>
                                            ))}

                                            <div className={photo_styles.addPhoto} onClick={() => fileInputRef.current?.click()}>
                                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M24 5.92773V20.9157" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M41.9997 23.9277H27.0117" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    <path d="M6 23.9277H20.988C22.656 23.9277 24 25.2717 24 26.9397V41.9277" stroke="#4A7BD9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                        </div>
                    </div>
                    <div className={styles.actionButtons}>
                        <button className={commonStyles.secondaryButton} style={{ width: "124px" }} onClick={onClose}>
                            Cancel
                        </button>
                        <button  style={{ width: "124px" }}className={commonStyles.nextStepButton} onClick={handleSubmit}>
                            {!comment ? <span>Create</span> : <span>Save</span>}
                        </button>

                    </div>
                </div>
            </div>
        </div>
  );
}