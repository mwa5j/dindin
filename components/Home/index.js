import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Dimensions} from 'react-native'
import firebase from 'firebase'
import MapView, {Marker, AnimatedRegion} from 'react-native-maps'

import Card from '../Card'
import DateEntry from '../DateEntry'

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];

const d = new Date()
const dayIndex = d.getDay()
const date = d.getDate()
const monthIndex = d.getMonth()

const eventButtonPic = '../../static/DINDIN/Sliced/addNewEvent.png'

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            dinners: [],
            pending: [],
            lat: 0,
            lng: 0,
        }
    }

    componentDidMount(){
        firebase.database().ref('dinners').on('value', snapshot => {
            const dinnersObject = snapshot.val()
            const parsedDinners = []

            if(dinnersObject){
                const dinnersList = Object.keys(dinnersObject).map(key => ({
                    ...dinnersObject[key],
                    key: key,
                }))

                for(var i = 0; i < dinnersList.length; i++){
                    if(dinnersList[i].status == "pending"){
                        parsedDinners.push(dinnersList[i])
                    }
                }

                this.setState({dinners: parsedDinners})
            }
        })
    }

    _renderItem = (item) => {
        return(
            <View>
                <Card 
                    uniqueID={item.key}
                    sender={item.user}
                    day={item.day}
                    date={item.date}
                    month={item.month}
                    hour={item.hour}
                    minute={item.minute}
                    ampm={item.ampm}
                    address={item.address}
                    status={item.status}
                />
            </View>
        )
    }

    

    render() {

        // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1820 Taylor Rd Crozier, VA 23039&key=AIzaSyD-WGg4J1swtNCC1688tz3CBfDlGedWuPQ')
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({
        //             lat: data.results[0].geometry.location.lat,
        //             lng: data.results[0].geometry.location.lng
        //         })
        //     })

        return (
            <View>
                <View>
                    {/* <Text style={styles.headerText}>Welcome {firebase.auth().currentUser.displayName}</Text> */}
                </View>
                <View>
                    <Text style={styles.titleText}>Pending ({this.state.dinners.length})</Text>
                    {this.state.dinners && this.state.dinners.length > 0 &&
                        <FlatList
                            data={this.state.dinners}
                            renderItem={({item}) => this._renderItem(item)}
                            horizontal={true}
                        />
                    }
                </View>
                <View>
                    <DateEntry day={days[dayIndex]} date={date} month={months[monthIndex]} dinners={this.state.dinners}/>
                </View>
                <View>
                    <DateEntry day={days[dayIndex + 1]} date={date + 1} month={months[monthIndex]} dinners={this.state.dinners}/>
                </View>
                <View>
                    <DateEntry day={days[dayIndex + 2]} date={date + 2} month={months[monthIndex]} dinners={this.state.dinners}/>
                </View>
            </View>

                // <MapView
                //     style={styles.map}
                //     region={{
                //         latitude: this.state.lat,
                //         longitude: this.state.lng,
                //         latitudeDelta: LATITUDE_DELTA,
                //         longitudeDelta: LONGITUDE_DELTA,
                //     }}
                // >
                // </MapView>
        
        )
    }
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 10,
    },
    titleText: {
        fontSize: 20,
        marginLeft: 15,
        marginTop: 10,
    },
    listContainer: {
        height: 150
    },
    container: {
        height: '100%'
    },
    map: {
        flex: 1,
        height: '50%',
        ...StyleSheet.absoluteFillObject,
    }
})