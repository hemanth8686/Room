package com.vrsbuilding.roomapp.info;

import java.sql.Date;
import java.util.List;

import org.springframework.stereotype.Component;

import com.vrsbuilding.roomapp.model.Expenses;

@Component
public class ExpensesDetails {
	private int amount;
	private int userID;
	private String type;
	private Date expenseDate;
	private List<Expenses> dailyList;
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public int getUserID() {
		return userID;
	}
	public void setUserID(int userID) {
		this.userID = userID;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Date getExpenseDate() {
		return expenseDate;
	}
	public void setExpenseDate(Date expenseDate) {
		this.expenseDate = expenseDate;
	}
	public List<Expenses> getDailyList() {
		return dailyList;
	}
	public void setDailyList(List<Expenses> dailyList) {
		this.dailyList = dailyList;
	}
	
	
	
	
	

}
