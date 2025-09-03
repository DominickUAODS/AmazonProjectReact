import styles from "./ProductCatalog.module.css";



export default function LogOut(){
    const storedData = localStorage.getItem("user");
    const isMobile = window.innerWidth <= 768;
	const user = storedData ? JSON.parse(storedData) : null;


    return(
        <>
        {!user ? null : (
        <div className={styles.productCatalog}>
            <div className={styles.pCMainBlock}  style={{ cursor: "pointer" }}>
                <div className={styles.pcSpanBlock}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.056 23.0313V26.1833C24.056 27.1273 23.296 27.8873 22.352 27.8873H8.49599C7.55199 27.8873 6.79199 27.1273 6.79199 26.1833V5.81533C6.79199 4.87133 7.55199 4.11133 8.49599 4.11133H22.36C23.304 4.11133 24.064 4.87133 24.064 5.81533V8.96733" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.576 10.7207L25 15.3287C25.28 15.6247 25.28 16.0887 25 16.3767L20.584 20.9767" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                        <span className={styles.categorySpan}>
                            {isMobile ? "Exit" : "Log out"}
                        </span>

                </div>
            </div>
        </div>
        )}
        </>

    );
}