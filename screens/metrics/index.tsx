import React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import useData from "../../lib/data/useData"
import BarChart from "../../components/barChar";
import dayjs from 'dayjs'
require('dayjs/locale/es')

const groupDates = (dates) => dates.reduce((accumulator, date) => {
  const parsed = new Date(date);
  parsed.setDate(1)
  parsed.setHours(0, 0, 0, 0)
  const groupKey = parsed.toISOString()
  accumulator[groupKey] = accumulator[groupKey] || {dates: []};
  accumulator[groupKey].dates.push(parsed.getDay());
  return accumulator;
}, {});


export function MetricsScreen({navigation, route}) {
  const { dashes } = useData()

  const dashCompleted = Object.values(dashes).filter(({ tokens, quantity }) => {
    return quantity === tokens.length
  }).map(({ tokens }) => {
    return tokens[tokens.length -1].date
  })

  const groups = groupDates(dashCompleted)

  const constGroups = Object.keys(groups).map((key) => {
    const { dates } = groups[key]
    const date = new Date(key)
    const monthInSpanish = dayjs(date).locale('es').format('MMMM');

    return {
      label: monthInSpanish,
      value: dates.length,
    }
  })
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tableros completados</Text>
      <Text style={styles.count}>{dashCompleted?.length}/{Object.values(dashes)?.length}</Text>
      <Text style={styles.title}>Tableros completados por mes</Text>
      <BarChart data={constGroups}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20
  },
  count: {
    fontSize: 32,
    textAlign: 'center'
  }
})
