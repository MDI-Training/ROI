'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Component() {
  const [inputs, setInputs] = useState({
    participantsCount: 12,
    dailySalary: 300,
    programCost: 0,
    travelExpenses: 0,
    trainingDays: 10,
    industryType: 'manufacturing'
  })

  // Calculate derived values
  const yearlyWorkDays = 220
  const yearlySalaryPerParticipant = inputs.dailySalary * yearlyWorkDays
  const totalYearlySalary = yearlySalaryPerParticipant * inputs.participantsCount

  // Calculate costs
  const locationCosts = 80 * inputs.participantsCount
  const participantDowntime = (12 * inputs.dailySalary) * inputs.trainingDays
  const totalCosts = Number(inputs.programCost) + Number(inputs.travelExpenses) + locationCosts + participantDowntime

  // Calculate benefits
  const directBenefits = {
    efficiency: totalYearlySalary * 0.05,
    safety: totalYearlySalary * 0.02,
    customerSatisfaction: totalYearlySalary * 0.03,
    sales: totalYearlySalary * 0.03
  }

  const secondaryBenefits = {
    efficiency: totalYearlySalary * 0.01,
    safety: totalYearlySalary * 0.01,
    customerSatisfaction: totalYearlySalary * 0.01,
    sales: totalYearlySalary * 0.01
  }

  const totalDirectBenefits = Object.values(directBenefits).reduce((a, b) => a + b, 0)
  const totalSecondaryBenefits = Object.values(secondaryBenefits).reduce((a, b) => a + b, 0)
  const roi = ((totalDirectBenefits + totalSecondaryBenefits - totalCosts) / totalCosts) * 100

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ROI Calculator for Leadership Development Programs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="participants">Number of Participants</Label>
              <Input
                id="participants"
                type="number"
                value={inputs.participantsCount}
                onChange={(e) => setInputs(prev => ({ ...prev, participantsCount: Number(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dailySalary">Daily Salary (€)</Label>
              <Input
                id="dailySalary"
                type="number"
                value={inputs.dailySalary}
                onChange={(e) => setInputs(prev => ({ ...prev, dailySalary: Number(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select 
                value={inputs.industryType}
                onValueChange={(value) => setInputs(prev => ({ ...prev, industryType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="banking">Banking</SelectItem>
                  <SelectItem value="pharma">Pharma</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="programCost">Program Cost (€)</Label>
              <Input
                id="programCost"
                type="number"
                value={inputs.programCost}
                onChange={(e) => setInputs(prev => ({ ...prev, programCost: Number(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="travelExpenses">Travel Expenses (€)</Label>
              <Input
                id="travelExpenses"
                type="number"
                value={inputs.travelExpenses}
                onChange={(e) => setInputs(prev => ({ ...prev, travelExpenses: Number(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="trainingDays">Training Days</Label>
              <Input
                id="trainingDays"
                type="number"
                value={inputs.trainingDays}
                onChange={(e) => setInputs(prev => ({ ...prev, trainingDays: Number(e.target.value) }))}
              />
            </div>
          </div>

          {/* Results Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aspect</TableHead>
                <TableHead>Direct Impact (€)</TableHead>
                <TableHead>Secondary Impact (€)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Efficiency & Productivity</TableCell>
                <TableCell>{directBenefits.efficiency.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</TableCell>
                <TableCell>{secondaryBenefits.efficiency.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Safety</TableCell>
                <TableCell>{directBenefits.safety.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</TableCell>
                <TableCell>{secondaryBenefits.safety.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer Satisfaction</TableCell>
                <TableCell>{directBenefits.customerSatisfaction.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</TableCell>
                <TableCell>{secondaryBenefits.customerSatisfaction.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Sales</TableCell>
                <TableCell>{directBenefits.sales.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</TableCell>
                <TableCell>{secondaryBenefits.sales.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</TableCell>
              </TableRow>
              <TableRow className="font-bold">
                <TableCell>Total Benefits</TableCell>
                <TableCell>{totalDirectBenefits.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</TableCell>
                <TableCell>{totalSecondaryBenefits.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Summary Card */}
          <Card className="bg-primary/5">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Total Costs</p>
                  <p className="text-2xl font-bold">{totalCosts.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">ROI</p>
                  <p className="text-2xl font-bold">{roi.toFixed(2)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
