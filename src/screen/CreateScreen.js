import React , { useState,useContext } from 'react';
import {View,Text,TextInput,Button,StyleSheet} from 'react-native';
import {Context as blogContext } from '../context/BlogContext';


const CreateScreen = ({navigation}) => {

    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');

    const {addBlogPostDynamicContent} = useContext(blogContext);

    return (
        <View>
            <Text style={styles.label}>Enter Title : </Text>
            <TextInput
                style = {styles.input}
                value = {title}
                onChangeText = {(text) => setTitle(text)}
            />

            <Text style={styles.label}>Enter Content : </Text>
            <TextInput
                style = {styles.input}
                value = {content}
                onChangeText = {(text) => setContent(text)}
            />
            <Button
            title='Add Blog Post'
            onPress = {() => {
                addBlogPostDynamicContent(title,content,() => {
                    navigation.navigate('Index');
                });
                }
            }
            />
        </View>
    )
}


const styles = StyleSheet.create({
    input : {
        fontSize : 18,
        borderColor : 'black',
        borderWidth : 1,
        padding : 5,
        marginVertical : 5
    },
    label : {
        fontWeight : 'bold',
        fontSize : 20,
        margin : 10
    }
});

export default CreateScreen;