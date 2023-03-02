import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import RazorPay from 'react-native-razorpay';
import { API_KEY } from "@env";

// super component
class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment: false,
    };
  }

  handlePayment(num) {
    const options = {
      name: 'starbucks',
      key: API_KEY,
      description: 'buy coffee',
      currency: 'INR',
      amount: 100 * num,
      prefill: {
        email: 'nazimudheen267@gmail.com',
        contact: 9283892398,
        name: 'Tester',
      },
      theme: {
        color: '#000',
      },
    };

    RazorPay.open(options)
      .then(data => {
        this.setState({payment: true});
        console.log(data);
      })
      .catch(err => {
        this.setState({payment: false});
        console.err(err);
      });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'steelblue',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: '600', color: '#fff', fontSize: 35}}>
          Payment Success
        </Text>
      </View>
    );
  }
}

// app component
export class App extends Checkout {

  home = (
    <View
      style={{
        flex: 1,
        backgroundColor: 'steelblue',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: 300,
          width: 300,
          backgroundColor: 'yellow',
          borderRadius: 20,
          padding: 10,
        }}>
        <Image
          style={{height: 200, width: '100%'}}
          source={{
            uri: 'https://media.gettyimages.com/id/157774909/photo/frappuccino-beverage-from-starbucks-coffee.jpg?s=612x612&w=gi&k=20&c=a9Yx_2GJ37TfadD-RJvTtb3fQPCFfp-ArjaqEzkULMc=',
          }}
        />
        <TouchableOpacity
          onPress={() => super.handlePayment(3)}
          style={{
            width: '100%',
            height: 50,
            backgroundColor: 'green',
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontWeight: '600', color: '#fff', fontSize: 15}}>
            Buy This
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    return this.state.payment ? super.render() : this.home;
  }
}

export default App;
