import React , { useContext } from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import {Context as blogContext} from '../context/BlogContext';
import {Feather} from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {

    const {state} = useContext(blogContext);
    const blogId = navigation.getParam('id');

    const blogContent = state.find((blog) => blog.id === blogId);

    return (
        <View>
            <Text style={styles.label}>{blogContent.title}</Text>
            <Text style={styles.input}>{blogContent.content}</Text>
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

ShowScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight : () => (
            <TouchableOpacity onPress={() => navigation.navigate('Edit',{id : navigation.getParam('id')})}>
                <Feather name="edit" size={30} color="black" />
            </TouchableOpacity>
        )
    }
}


export default ShowScreen;