import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  ScrollView
} from 'react-native';

export default class LoadingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sequences: [],
      seqDone: []
    };

  }

  componentDidMount() {
    const { navigation } = this.props;
    const targets = navigation.getParam('targets');

    this.getSequenceData(targets)
    // .then((data) => {console.log('out of getsequencedata',data)})
    .then(data => this.hydrateData(data))
    .then(data => this.plswork(data))
    // .then(data => console.log('data', data))
    // .then((data) => this.setState({seqDone: data}))
    // .then(console.log('stateee',this.state.seqDone))

  }


  getSequenceData(targets) {
    let joined = []
    return new Promise((resolve, reject) => {
      // console.log('getsequencedata')
      targets.forEach((element) => {
        return fetch(`https://align-api.appspot.com/api/sequence?target=${element}`)
        .then((response) => response.json())
        .then((responseJson) => {
          joined = this.state.data.concat(responseJson)
          this.setState({
            data: joined
          })
          if (joined) {
            resolve(joined);
            // console.log('dataaaa',joined);
          } else {
            reject(Error('Sequences not found'));
          }
        })
      });
    });
  }

  fetchdata = (item) => {
    return fetch(`https://align-api.appspot.com/api/pose?id=${item}`)
    .then (response => response.json())
  }

  plswork = (items) => {
    return new Promise((resolve, reject) => {

      Promise.all(items.map(nestedArray => {
        return Promise.all(nestedArray.map(this.fetchdata))
      }
      ))
      .then((results) => {
        console.log(JSON.stringify(results))
        if (results){
          this.setState({
            seqDone: results
          })
          resolve(results);
          console.log('seqDone after setting state',this.state.seqDone[0][0])
        } else {
          reject(Error('Sequences not found'));
        }
      })
    });
  }

  hydrateData(data) {
    return new Promise((resolve, reject) => {
      let joined2 = []
      data.forEach((sequence) => {
        joined2.push(sequence.poses);
        this.setState({
          sequences: joined2
        });
      })
      if (this.state.sequences) {
        console.log(this.state.sequences)
        resolve(this.state.sequences);
      } else {
        reject(Error('Sequences not found'));
      }
    });
  }


  render() {
    const ready = this.state.seqDone
    console.log(ready, "render")
    let poseNamesToRender = []
    if (ready) {
      ready.forEach((sequence) => {
        sequence.reverse()
        sequence.forEach((poses) => {
          poses.forEach((pose) => {
            poseNamesToRender.push(
              <Text>
                <Text className='name'>{pose.name}</Text>
                <Text className='description'>- {pose.description}{"\n"}</Text>
              </Text>)
          })
        })
      })
    }
    return (
      <ScrollView>
        {poseNamesToRender}
      </ScrollView>
    );
  }
}

// sequence.poses.forEach((pose) => {
//   // console.log(pose)
//   return fetch(`http://127.0.0.1:8000/api/pose?id=${pose}`, {
//     method: 'GET',})
//   .then((response) => response.json())
//   .then((responseJson) => {
//     joined2.push(responseJson)
//     console.log('joined2 inside',joined2)
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// });
// let joined3 = this.state.sequences.concat(joined2);
// this.setState({
//   sequences: joined3
// });
// joined2.length = 0

// sequenceArray.forEach((poseFlow) => {
//   return fetch(`http://127.0.0.1:8000/api/pose?id=${poseFlow}`, {
//     method: 'GET',})
//   .then((response) => response.json())
//   .then((responseJson) => {
//     let hailMary = this.state.sequences.concat(responseJson[0]);
//     this.setState({
//       sequences: hailMary
//     });
//
//     console.log('state sequence',this.state.sequences);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// })

//   return fetch(`http://127.0.0.1:8000/api/sequence?target=${element}`)
//   .then((response) => response.json())
//   .then((responseJson) => {
//     let joined = this.state.data.concat(responseJson)
//     this.setState({
//       data: joined
//     })
//     console.log('after setting state for data',this.state.data)
//     this.idek(responseJson)
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// });
// console.log('after component did mount',this.state.data);
// }

// const { navigation } = this.props;
// // const practice = navigation.getParam('practice');
// const targets = navigation.getParam('targets');
//
// targets.forEach((element) => {
//
//   return fetch(`http://127.0.0.1:8000/api/sequence?target=${element}`)
//   .then((response) => response.json())
//   .then((responseJson) => {
//     let joined = this.state.data.concat(responseJson)
//     this.setState({
//       data: joined
//     })
//     console.log('after setting state for data',this.state.data)
//     this.idek(responseJson)
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// });
// console.log('after component did mount',this.state.data);

// idek(stateData){
//   console.log("anyting?");
//   let joined2 = []
//   // let raw = this.state.data
//   // console.log(raw);
//   stateData.forEach((sequence) => {
//     console.log('sequence- state.data.each',sequence.poses)
//     joined2.push(sequence.poses);
//     // this.halp(sequence.poses);
//     console.log(joined2);
//     this.setState({
//       sequences: joined2
//     });
//     console.log('sequencessdsdsfdfsdffs',this.state.sequences)
//   })
// fuckthis() {
//   const nestedPromise = async (items = []) => {
//     return await Promise.all(
//       items.map(async item => {
//         if (Array.isArray(item) && item.length) {
//           return await nestedPromise(item)
//         }
//         // return await call to your function
//         return 'response-' + item
//         //           .then((response) => response.json())
//
//       })
//     )
//   }
// }


// getPoseData(data) {
//   let temp = []
//   return new Promise((resolve, reject) => {
//     data.forEach((array) => {
//       return new Promise((resolve, reject) => {
//         array.forEach((pose) => {
//           return fetch(`http://127.0.0.1:8000/api/pose?id=${pose}`, {method: 'GET',})
//           .then((response) => response.json())
//           .then((responseJson) => {
//             temp = this.state.seqDone.concat(responseJson[0]);
//             this.setState({
//               seqDone: temp
//             })
//             console.log(temp)
//           })
//         })
//         if (this.state.seqDone) {
//           console.log(this.state.seqDone)
//           resolve(this.state.seqDone);
//         } else {
//           reject(Error('Sequences not found'));
//         }
//       })
//     });
//     if (this.state.seqDone) {
//       console.log(this.state.seqDone)
//       resolve(this.state.seqDone);
//     } else {
//       reject(Error('Sequences not found'));
//     }
//   })
// }
