import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async(item) => {
    try {
        const value = await AsyncStorage.getItem(item);
        return JSON.parse(value);
    } catch (error) {
        console.log("GetItem error ",error);
        return null;
    }
};

export const setItem = async(item,value)=>{
    try {
        await AsyncStorage.setItem(item, JSON.stringify(value));
    } catch (error) {
        console.log("SetItem error ", error);
        return null;
    }
}