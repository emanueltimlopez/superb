import React from "react"
import { Dimensions, StyleSheet, View } from "react-native"
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

  const tokens = Object.values(dashes).map(({ tokens }) => {
    return tokens.map(({ date }) => date)
  }).flat()
  const groups = groupDates(tokens)
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
      <BarChart data={constGroups}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
})
