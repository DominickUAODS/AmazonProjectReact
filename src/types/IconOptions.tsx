import type { JSX } from "react";

export interface IconOption {
	value: number;
	label: string;
	icon: JSX.Element;
}

export const IconOptions: IconOption[] = [
	{
		value: 1,
		label: "Shirt",
		icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M7.96094 6.74418L10.1389 5.46618C10.3009 5.37018 10.5109 5.40618 10.6309 5.55018C10.8589 5.82018 11.1109 6.03618 11.3689 6.21018C12.5929 7.04418 14.2309 7.04418 15.4549 6.21018C15.7129 6.03618 15.9649 5.82018 16.1929 5.55018C16.3189 5.40618 16.5229 5.37018 16.6849 5.46618L20.8009 7.87218C20.9869 7.98018 21.0529 8.22618 20.9389 8.41218L19.5109 10.7822C19.3969 10.9682 19.1509 11.0282 18.9709 10.9082L18.2029 10.4222C17.9449 10.2602 17.6029 10.4462 17.6029 10.7522V17.0522C17.6029 17.2322 17.4829 17.3822 17.3149 17.4302C16.8589 17.5502 15.8749 17.7602 14.5189 17.8442" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M15.1693 10.962L14.0173 12.87C13.9273 13.02 13.7293 13.068 13.5793 12.972L12.9613 12.582C12.7513 12.45 12.4813 12.6 12.4813 12.846V17.922C12.4813 18.066 12.3853 18.192 12.2473 18.228C11.7853 18.348 10.6633 18.588 9.10926 18.582C7.55526 18.582 6.43326 18.348 5.97126 18.228C5.83326 18.192 5.73726 18.066 5.73726 17.922V12.846C5.73726 12.6 5.46726 12.45 5.25726 12.582L4.63926 12.972C4.48926 13.068 4.29126 13.02 4.20126 12.87L3.04926 10.962C2.95926 10.812 3.00726 10.614 3.15726 10.53L6.46926 8.59197C6.60126 8.51397 6.76926 8.54397 6.86526 8.66397C7.05126 8.87997 7.25526 9.05397 7.45926 9.19197C8.44326 9.86397 9.76326 9.86397 10.7473 9.19197C10.9513 9.05397 11.1553 8.87997 11.3413 8.66397C11.4433 8.54997 11.6053 8.51997 11.7373 8.59197L15.0493 10.53C15.1993 10.62 15.2473 10.812 15.1573 10.962H15.1693Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>)
	},
	{
		value: 2,
		label: "Fashion",
		icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M9.40216 12.4318L3.64816 15.6838C2.83816 16.1398 2.76616 17.3218 3.55216 17.8138C3.75016 17.9398 3.98416 18.0118 4.24816 18.0118H15.6962H19.7402C20.0042 18.0118 20.2382 17.9398 20.4362 17.8138C21.2222 17.3218 21.1502 16.1398 20.3402 15.6838L19.4882 15.2038C17.0762 13.8478 14.6282 12.8218 12.2822 11.4778C11.8862 11.2498 11.2442 10.8238 11.1722 10.7098C10.5122 9.71377 12.5882 9.90577 13.4222 8.99977C14.6642 7.65577 13.3082 6.03577 12.1802 5.99377C11.1122 5.95177 10.3022 6.74977 10.3262 7.73377" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>)
	},
	{
		value: 3,
		label: "Ruler",
		icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2.46094 7.36218V3.13818" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M10.4141 3.13818H20.9141C21.2561 3.13818 21.5381 3.41418 21.5381 3.76218V6.73818C21.5381 7.08018 21.2621 7.36218 20.9141 7.36218H10.4141" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M4.95603 3.13818H7.93803C8.28003 3.13818 8.56203 3.42018 8.56203 3.76218V20.2382C8.56203 20.5802 8.28003 20.8622 7.93803 20.8622H4.95603C4.61403 20.8622 4.33203 20.5802 4.33203 20.2382V3.76218C4.33203 3.42018 4.61403 3.13818 4.95603 3.13818Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M11.2148 4.71018V3.13818" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M12.7031 5.40018V3.13818" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M14.1953 4.71018V3.13818" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M15.6836 5.40018V3.13818" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M17.1797 4.71018V3.13818" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M18.6719 5.40018V3.13818" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M20.1602 4.71018V3.13818" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>)
	},
	{
		value: 4,
		label: "Hammer",
		icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M9.26517 10.2302C9.12117 10.2902 9.03117 10.4342 9.03117 10.5842V11.6882C9.03117 12.0422 8.59317 12.2162 8.35317 11.9462L5.35317 8.59824C5.13117 8.34624 5.30517 7.95024 5.64117 7.95024H6.72717C6.81117 7.95024 6.89517 7.92024 6.96117 7.87224L11.1132 4.72224C11.7732 4.22424 12.5412 3.88224 13.3572 3.73824L13.8732 3.64224C14.4192 3.54624 14.8632 4.07424 14.6652 4.59024L14.6112 4.73424C14.4012 5.29224 14.3532 5.90424 14.4732 6.48624L14.9352 8.71224C15.0372 9.21024 14.8092 9.71424 14.3712 9.96624L13.3452 10.5602C13.1652 10.6622 12.9132 10.6622 12.6672 10.5962C12.3132 10.5062 12.0072 10.2962 11.7672 10.0202L10.3452 8.39424" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M13.6562 12.3241L18.3362 19.6981C18.6002 20.1181 19.0623 20.3701 19.5543 20.3701C20.3523 20.3701 20.9943 19.7221 20.9943 18.9301V17.4601C20.9943 17.1361 20.8863 16.8181 20.6823 16.5661L16.0922 10.9321" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M5.38672 20.3701V15.2461" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M3.80469 14.9639H6.97269" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>)
	},
	{
		value: 5,
		label: "Bed",
		icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4.16406 9.38403V5.99403C4.16406 5.70603 4.51206 5.47803 4.93806 5.47803H19.0681C19.4941 5.47803 19.8421 5.71203 19.8421 5.99403V9.38403" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M19.6574 11.1421H4.33941C3.56731 11.1421 2.94141 11.768 2.94141 12.5401V14.7181C2.94141 15.4902 3.56731 16.1161 4.33941 16.1161H19.6574C20.4295 16.1161 21.0554 15.4902 21.0554 14.7181V12.5401C21.0554 11.768 20.4295 11.1421 19.6574 11.1421Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M6.60156 9.38422V8.34022C6.60156 8.25022 6.72156 8.17822 6.86556 8.17822H11.7316C11.8756 8.17822 11.9956 8.25022 11.9956 8.34022V9.38422" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M11.7852 8.17822H17.1732C17.2992 8.17822 17.3952 8.25022 17.3952 8.34022V9.38422" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M6.43672 17.748L5.57272 18.408C5.18872 18.702 4.63672 18.426 4.63672 17.946V17.748" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M17.5625 17.748L18.4265 18.408C18.8105 18.702 19.3625 18.426 19.3625 17.946V17.748" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>)
	},
	{
		value: 6,
		label: "Sofa",
		icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.7542 15.93V11.376C15.7542 11.064 16.0062 10.812 16.3182 10.812H20.4342C20.7462 10.812 20.9982 11.064 20.9982 11.376V18.876C20.9982 19.188 20.7462 19.44 20.4342 19.44H15.7122H8.27819H3.55619C3.24419 19.44 2.99219 19.188 2.99219 18.876V11.376C2.99219 11.064 3.24419 10.812 3.55619 10.812H7.67219C7.98419 10.812 8.23619 11.064 8.23619 11.376V15.93" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M5.35156 9.10206V5.40006C5.35156 4.93806 5.64556 4.56006 6.00556 4.56006H17.9996C18.3596 4.56006 18.6536 4.93206 18.6536 5.40006V9.10206" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M10.1445 12.3359H13.8525" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M10.1445 14.9399H13.8525" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>)
	},
	{
		value: 7,
		label: "Cleaner",
		icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M7.81683 9.99589L7.44483 10.3679C7.18083 10.6319 7.03083 10.9919 7.02483 11.3699L6.97083 17.9219C6.97083 18.2339 6.95283 18.7139 6.88683 19.0199C6.67683 20.0039 7.25883 21.0239 8.10483 21.0239H13.2828H15.8868C16.7328 21.0239 17.3148 20.0039 17.1048 19.0199C17.0448 18.7319 17.0208 18.2159 17.0208 17.9219L16.9668 10.7819V6.22189C16.9608 5.42989 16.3188 4.78789 15.5208 4.78789H13.5768C13.1928 4.78789 12.8268 4.93789 12.5568 5.21389L9.25083 8.54389L8.28483 4.94989C8.16483 4.54789 8.28483 4.11589 8.59083 3.83389L9.20883 3.25789C9.52083 2.96989 9.97683 2.88589 10.3728 3.04789L11.6748 3.58789" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>)
	},
	{
		value: 8,
		label: "Cleaning spray",
		icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M11.85 11.2141L8.25002 18.8641C7.78202 19.8541 8.50802 20.9941 9.60002 20.9941H18.834C19.92 20.9941 20.64 19.8781 20.196 18.8881L16.59 10.8721" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M6.08806 5.94003V7.08603C6.08806 7.47003 5.77606 7.78203 5.39206 7.78203H4.36006C3.97606 7.78203 3.66406 7.47003 3.66406 7.08603V4.84203C3.66406 4.45803 3.97606 4.14603 4.36006 4.14603H4.38406C5.33806 4.14603 6.27406 3.93003 7.16806 3.58203C10.1561 2.42403 13.8641 3.30003 15.2801 3.72003C15.6101 3.81603 15.8141 4.14003 15.7661 4.48203C15.5321 6.04203 15.6581 7.78203 15.7661 8.76003C15.8141 9.17403 15.4901 9.52803 15.0761 9.52803H12.2081C12.1001 9.52803 11.9981 9.50403 11.9021 9.45603L8.11006 7.57803L6.32806 10.302C6.12406 10.614 6.34606 11.028 6.71806 11.028H8.15806C8.31406 11.028 8.45806 10.95 8.54206 10.824L9.08806 10.032" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>)
	},
	{
		value: 9,
		label: "Washing machine",
		icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M19.3638 3.00586H4.64581C3.74117 3.00586 3.00781 3.73922 3.00781 4.64386V19.3619C3.00781 20.2665 3.74117 20.9999 4.64581 20.9999H19.3638C20.2685 20.9999 21.0018 20.2665 21.0018 19.3619V4.64386C21.0018 3.73922 20.2685 3.00586 19.3638 3.00586Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M10.1406 7.16406H18.9066" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M4.85547 7.16393H7.19547C7.88547 7.16393 8.44947 6.60593 8.44947 5.90993V4.87793" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M11.9992 19.0321C14.6502 19.0321 16.7992 16.8831 16.7992 14.2321C16.7992 11.5812 14.6502 9.43213 11.9992 9.43213C9.34825 9.43213 7.19922 11.5812 7.19922 14.2321C7.19922 16.8831 9.34825 19.0321 11.9992 19.0321Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M14.796 14.232C14.796 12.69 13.542 11.436 12 11.436" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M9.20312 14.2319C9.20312 15.7739 10.4571 17.0279 11.9991 17.0279" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>)
	},
	{
		value: 10,
		label: "Vacuum cleaner",
		icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M16.4085 21.0898H19.6905C20.4105 21.0898 20.9925 20.5078 20.9925 19.7878V14.0398C20.9925 11.2918 19.5465 8.68778 17.1105 7.41578C16.0425 6.85778 14.7165 6.49778 13.0785 6.55778C12.3765 6.58178 11.8125 7.15778 11.8125 7.86578V13.1518" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M12.6473 21.0898C14.3705 21.0898 15.7673 19.7144 15.7673 18.0178C15.7673 16.3212 14.3705 14.9458 12.6473 14.9458C10.9242 14.9458 9.52734 16.3212 9.52734 18.0178C9.52734 19.7144 10.9242 21.0898 12.6473 21.0898Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M15.4688 8.56787V11.0039C15.4688 11.9279 15.7147 12.8519 16.2607 13.5959C16.8067 14.3399 17.7127 15.0539 19.1887 15.1079" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M13.7392 4.95016C13.7392 3.82216 12.8272 2.91016 11.6992 2.91016C10.7932 2.91016 9.99516 3.51016 9.74316 4.38616L6.03516 17.2382" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M4.60381 18.8882H6.31981C7.20181 18.8882 7.91581 19.6022 7.91581 20.4842C7.91581 20.8202 7.64581 21.0902 7.31581 21.0902H3.60781C3.27781 21.0902 3.00781 20.8202 3.00781 20.4902C3.00781 19.6082 3.72181 18.8882 4.60381 18.8882Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>)
	},
	{
		value: 11,
		label: "Laptop",
		icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12.0013 13.8301H7.13531C6.75731 13.8301 6.44531 13.5361 6.44531 13.1701V10.8721" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M12 7.91406H16.866C17.244 7.91406 17.556 8.20806 17.556 8.57406V10.8721" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M4.39062 14.9042V6.8882C4.39062 6.2342 4.96062 5.7002 5.66262 5.7002H18.3406C19.0426 5.7002 19.6126 6.2282 19.6126 6.8882V14.9042" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M20.3635 16.5181H3.63551C3.14951 16.5181 2.84351 17.0401 3.08351 17.4601L3.37751 17.9761C3.49151 18.1741 3.70151 18.2941 3.92951 18.2941H20.0635C20.2915 18.2941 20.5015 18.1741 20.6155 17.9761L20.9095 17.4601C21.1495 17.0401 20.8435 16.5181 20.3575 16.5181H20.3635Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>)
	},
	{
		value: 12,
		label: "Computer",
		icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M12.0015 13.8598H5.4375V10.1938" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M12 6.52783H18.564V10.1938" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M19.5078 4.36182H4.50181C3.6767 4.36182 3.00781 5.0307 3.00781 5.85582V14.5318C3.00781 15.3569 3.6767 16.0258 4.50181 16.0258H19.5078C20.3329 16.0258 21.0018 15.3569 21.0018 14.5318V5.85582C21.0018 5.0307 20.3329 4.36182 19.5078 4.36182Z" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M8.34766 19.6382H15.6557" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M12 16.0259V19.6379" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>)
	},
	{
		value: 13,
		label: "Boxing gloves",
		icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M9.16334 15.552L8.11334 17.634C7.75934 18.336 6.87734 18.588 6.20534 18.168L3.63134 16.566C3.10334 16.236 2.87534 15.588 3.06734 14.994C3.42134 13.92 4.20734 12.192 5.90534 10.566C6.19334 10.29 6.59534 10.17 6.99134 10.23C7.76534 10.338 9.07934 10.632 10.0993 11.406C10.5373 11.742 10.8433 12.222 10.9933 12.756V12.774C11.1553 13.362 11.1973 13.968 11.1073 14.568L10.8793 16.164C10.8253 16.542 10.6153 16.866 10.3213 17.07" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M11.4715 10.5961C11.5075 10.5361 11.5435 10.4761 11.5675 10.4101C11.7175 10.0381 11.4895 9.82812 11.1895 9.65412C10.9915 9.54012 10.7815 9.43212 10.5775 9.33012C10.1755 9.12612 9.75547 8.94012 9.33547 8.77812C8.98747 8.64612 8.62747 8.52612 8.26147 8.44212C7.89547 8.35812 7.52947 8.25612 7.15747 8.28612C6.82747 8.31012 6.68947 8.49012 6.60547 8.73012" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M17.5931 10.89C17.5571 10.74 17.5091 10.56 17.4311 10.356C17.2931 9.98995 16.9031 10.068 16.5971 10.146C15.4751 10.452 14.3891 10.89 13.3631 11.43C13.1231 11.556 12.8411 11.724 12.8051 12.024C12.7811 12.216 12.8591 12.402 12.9731 12.564" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M8.25781 14.3761C8.25781 14.3761 8.62381 13.7461 9.51781 14.1001" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M18.3548 15.7559L18.8228 17.2559C19.0268 17.9039 19.7468 18.2219 20.3588 17.9339C20.8748 17.6939 21.1208 17.0999 20.9408 16.5659C20.7908 16.1159 20.5208 15.6539 20.2088 15.2039C19.8608 14.6939 19.4648 14.2199 19.0448 13.7579C18.8888 13.5839 18.7148 13.3799 18.5528 13.1699C18.2168 12.7139 17.6528 12.4859 17.1008 12.6059C16.4588 12.7379 15.6008 12.9659 14.7548 13.3319C14.1608 13.5899 13.7648 14.1599 13.7468 14.8079L13.7228 15.6959C13.6808 17.1899 13.9688 18.6779 14.5688 20.0519C14.7848 20.5499 15.3308 20.8139 15.8588 20.6879L19.2488 19.8419" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M15.1367 17.2078C15.3827 16.9198 15.9287 16.4518 16.9847 16.4038" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M9.875 7.44609L11.999 3.28809L14.069 9.49209" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>)
	},
	{
		value: 14,
		label: "Jump rope",
		icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M7.92772 17.2681V19.9081C7.92772 20.5081 7.44172 20.9941 6.84172 20.9941C6.24172 20.9941 5.76172 20.5081 5.76172 19.9081V17.2681" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M18.4785 17.0278V19.6678C18.4785 20.2678 17.9925 20.7538 17.3985 20.7538C16.8045 20.7538 16.3125 20.2678 16.3125 19.6678V17.0278" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M5.21484 15.3599H8.23284" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M15.7695 15.1261L18.7875 15.1201" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M6.71864 13.4519V11.4659C6.71864 10.1399 6.60464 8.7779 6.99464 7.4879C7.50464 5.8019 8.68064 4.3739 10.2706 3.6119C11.2066 3.1619 12.2506 2.9639 13.2886 3.0119C13.9006 3.0419 14.5186 3.1439 15.1006 3.3419C15.7006 3.5459 16.4026 3.8399 16.5766 4.5179C16.7266 5.0999 16.3786 5.7179 15.7786 5.8319C14.7826 6.0239 13.7686 6.1679 12.7906 6.4319C11.9986 6.6479 11.1886 7.0619 10.9126 7.8899C10.7986 8.2379 10.8046 8.6279 10.9726 8.9519C11.3926 9.7499 12.6346 9.5699 13.3906 9.5699C14.7586 9.5759 16.0726 10.0799 16.7266 11.3639C17.0626 12.0239 17.1286 12.7199 17.2006 13.4459" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>)
	}
];


// import Select, { components, OptionProps, SingleValueProps } from "react-select";
// Компонент для опций в списке
// const Option = (props: OptionProps<IconOption>) => (
// 	<components.Option {...props}>
// 		<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
// 			{props.data.icon}
// 			<span>{props.data.label}</span>
// 		</div>
// 	</components.Option>
// );

// // Компонент для выбранного значения
// const SingleValue = (props: SingleValueProps<IconOption>) => (
// 	<components.SingleValue {...props}>
// 		<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
// 			{props.data.icon}
// 			<span>{props.data.label}</span>
// 		</div>
// 	</components.SingleValue>
// );

// const IconSelect: React.FC = () => {
// 	return (
// 		<Select<IconOption>
// 			options={options}
// 			components={{ Option, SingleValue }}
// 			placeholder="Выберите иконку..."
// 		/>
// 	);
// };

// export default IconSelect;