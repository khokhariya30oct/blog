import React , { useContext,useState } from 'react';
import {Text,View,StyleSheet,TextInput,Button} from 'react-native';
import {Context as blogContext} from '../context/BlogContext';

const EditScreen = ({ navigation }) => {

    const {state,updateBlogPost} = useContext(blogContext);

    const blogContent = state.find((blog) => blog.id === navigation.getParam('id'));

    const [title,setTitle] = useState(blogContent.title);
    const [content,setContent] = useState(blogContent.content);

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
            title='Update Blog Post'
                onPress = {() => updateBlogPost({
                    id : blogContent.id,
                    title,
                    content
                }, () => {
                    navigation.navigate('Index');
                })
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


export default EditScreen;