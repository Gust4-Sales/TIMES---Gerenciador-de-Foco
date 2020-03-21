import React, { useState } from 'react'
import { View, Text, Picker} from 'react-native'

import styles from './styles'

export default function FormQuestion (props){
    const [selectedValue, setValue] = useState(props.defaultValue)

    return(
        <View style={styles.questionContainer} >
            <Text style={styles.question}>{props.question}</Text>
            <View style={styles.timeContainer}>
                <Text style={styles.selectedValue}>{selectedValue}</Text>
            </View>

            <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={selectedValue}
                onValueChange={ (itemValue) => { 
                    props.onValueSelected(itemValue)
                    setValue(itemValue)} }
            >
                {
                    props.options.map( option => <Picker.Item  label={option} value={option} key={option} /> )
                }
            </Picker>
        </View>   
    )
    
}
