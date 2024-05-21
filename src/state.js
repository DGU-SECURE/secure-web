import { atom } from 'recoil';
export const selectedBrandIdState = atom({
    key: 'selectedBrandIdState',
    default: localStorage.getItem('brandId') || null,
});
export const brandNameState = atom({
    key: 'brandNameState',
    default: localStorage.getItem('brandName') || '매장을 선택해주세요',
});
export const userNameState = atom({
    key: 'userNameState',
    default: localStorage.getItem('userName') || '비회원',
});
export const cartState = atom({
    key: 'cartState',
    default: JSON.parse(localStorage.getItem('cart')) || [],
});