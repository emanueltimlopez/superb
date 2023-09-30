import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useLingui } from "@lingui/react"
import { t } from "@lingui/macro"
import dayjs from 'dayjs'

import useData from "../../lib/data/useData"
import BarChart from "../../components/barChar";
require('dayjs/locale/es')
require('dayjs/locale/en')

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
  const { i18n } = useLingui()
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
    const monthInSpanish = dayjs(date).locale(i18n.locale).format('MMMM');

    return {
      label: monthInSpanish,
      value: dates.length,
    }
  })
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(i18n)`Boards completed`}</Text>
      <Text style={styles.count}>{dashCompleted?.length}/{Object.values(dashes)?.length}</Text>
      <Text style={styles.title}>{t(i18n)`Boards completed by month`}</Text>
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
