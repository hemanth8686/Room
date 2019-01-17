package com.vrsbuilding.roomapp.dao;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.imageio.ImageIO;
import javax.persistence.Query;

import org.apache.commons.codec.binary.Base64;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vrsbuilding.roomapp.info.ExpensesDetails;
import com.vrsbuilding.roomapp.model.Event;
import com.vrsbuilding.roomapp.model.Expenses;
import com.vrsbuilding.roomapp.model.MontlyExpenses;
import com.vrsbuilding.roomapp.model.RoomRegister;

@Repository
public class RoomDao {
	@Autowired
	private SessionFactory sessionFactory;
	@Autowired
	private RoomRegister roomRegister;
	@Autowired
	private Expenses expenses;
	@Autowired
	private ExpensesDetails expensesDetails;

	public void register(String firstName, String lastName, int age, String mobile, String password, String email,
			String dob, int status,byte[] bs) throws Exception {
		Session session = sessionFactory.openSession();
		Transaction beginTransaction = session.beginTransaction();
		try {
			SimpleDateFormat format = new SimpleDateFormat("dd-mm-yyyy");
			java.util.Date dobFormat = format.parse(dob);
			RoomRegister roomRegister = new RoomRegister();
			int my = roomRegister.getId();
			roomRegister.setFirstName(firstName);
			roomRegister.setLastName(lastName);
			roomRegister.setAge(age);
			roomRegister.setMobile(mobile);
			roomRegister.setPassword(password);
			roomRegister.setEmail(email);
			roomRegister.setStatus(0);
			roomRegister.setDateOfBirth(dobFormat);
			roomRegister.setCreatedDate(getDatelog());
			roomRegister.setProfilePic(bs);
			session.save(roomRegister);
			session.flush();
			session.clear();
			beginTransaction.commit();
			roomRegister.setUserID((roomRegister.getId() + 1000));
		} catch (HibernateException e) {

			e.printStackTrace();
		} finally {
			session.close();
		}

	}

	public static String getDatelog() {
		String dat = "";
		DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm");
		Date date = new Date();
		dat = dateFormat.format(date);

		return dat;
	}

	public String getPassword(int userName) {
		Session session = sessionFactory.openSession();
		String password = "";
		try {
			String SQL_QUERY = "from RoomRegister where id='" + userName + "'";

			Query query = session.createQuery(SQL_QUERY);

			for (Iterator<?> it = ((org.hibernate.Query<?>) query).iterate(); it.hasNext();) {
				RoomRegister Obj = (RoomRegister) it.next();
				password = Obj.getPassword();
			}

		} catch (HibernateException ex) {
			ex.printStackTrace();
		} finally {
			session.close();
		}

		return password;

	}
	
	public String getFirstName(int userName) {
		Session session = sessionFactory.openSession();
		String firstName = "";
		try {
			String SQL_QUERY = "from RoomRegister where id='" + userName + "'";

			Query query = session.createQuery(SQL_QUERY);

			for (Iterator<?> it = ((org.hibernate.Query<?>) query).iterate(); it.hasNext();) {
				RoomRegister Obj = (RoomRegister) it.next();
				firstName = Obj.getFirstName();
			}

		} catch (HibernateException ex) {
			ex.printStackTrace();
		} finally {
			session.close();
		}

		return firstName;

	}
	
	
	
	
	public int getStatus(int userName) {
		Session session = sessionFactory.openSession();
		int status = 0;
		try {
			String SQL_QUERY = "from RoomRegister where id='" + userName + "'";

			Query query = session.createQuery(SQL_QUERY);

			for (Iterator<?> it = ((org.hibernate.Query<?>) query).iterate(); it.hasNext();) {
				RoomRegister Obj = (RoomRegister) it.next();
				 status = Obj.getStatus();
			}

		} catch (HibernateException ex) {
			ex.printStackTrace();
		} finally {
			session.close();
		}

		return status;
	}
	

	public void enterDailyexpenses(String type, int amount, Integer userID, String expenseDate) throws Exception {
		Session session = sessionFactory.openSession();
		Transaction beginTransaction = session.beginTransaction();
		try {
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
			java.util.Date exDate = sf.parse(expenseDate);
			Expenses expenses = new Expenses();
			System.out.println(type);
			expenses.setType(type);
			expenses.setAmount(amount);
			expenses.setUserID(userID);
			expenses.setCreatedDate(getDatelog());
			expenses.setExpenseDate(exDate);
			session.save(expenses);
			beginTransaction.commit();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.close();
		}

	}

	public void enterMonthlyexpenses(String type, int amount, Integer userID, String expenseDate) {
		Session session = sessionFactory.openSession();
		Transaction beginTransaction = session.beginTransaction();
		try {
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
			java.util.Date exDate = sf.parse(expenseDate);
			MontlyExpenses montlyExpenses = new MontlyExpenses();
			montlyExpenses.setAmount(amount);
			montlyExpenses.setUserID(userID);
			montlyExpenses.setExpenseDate(expenseDate);
			montlyExpenses.setType(type);
			montlyExpenses.setCreatedDate(getDatelog());
			session.save(montlyExpenses);
			beginTransaction.commit();
		} catch (Exception e) {
			// TODO: handle exception
		} finally {
			session.close();
		}

	}

	public List<Expenses> getExpenseList(int userID,Date fDate, Date tDate) throws ParseException {
		List<Expenses> dailyList = new ArrayList<Expenses>();
		Session session = sessionFactory.openSession();
		SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd");
		Transaction beginTransaction = session.beginTransaction();
			
	
		
		try {
			String SQL_QUERY = " from Expenses where userId='"+userID+"' and ExpenseDate>='"+sf.format(fDate)+"' and ExpenseDate <= '"+sf.format(tDate)+"'";
			Query query = session.createQuery(SQL_QUERY);

			for (Iterator<?> it = ((org.hibernate.Query<?>) query).iterate(); it.hasNext();) {
				if(it.hasNext()) {
				Expenses Obj = (Expenses) it.next();
				Obj.getAmount();
				System.out.println(Obj.getAmount()+"dao");
				dailyList.add(Obj);
				
				}
			}

		} catch (HibernateException ex) {
			ex.printStackTrace();
		} finally {
			session.close();
		}
		return dailyList;

	}
	public List<Expenses> userWise(int userID,int userName,java.util.Date fDate,java.util.Date tDate){
		List<Expenses> userWiseList=new ArrayList<Expenses>();
		Session session = sessionFactory.openSession();
		SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd");
		
		try {
			String SQL_QUERY = " from Expenses where userId='"+userName+"'and ExpenseDate>='"+sf.format(fDate)+"' and ExpenseDate <= '"+sf.format(tDate)+"'";
			Query query = session.createQuery(SQL_QUERY);

			for (Iterator<?> it = ((org.hibernate.Query<?>) query).iterate(); it.hasNext();) {
				if(it.hasNext()) {
				Expenses Obj = (Expenses) it.next();
				Obj.getAmount();
				System.out.println(Obj.getAmount()+"dao");
				userWiseList.add(Obj);
				
				}
			}

		} catch (HibernateException ex) {
			ex.printStackTrace();
		} finally {
			session.close();
		}
		return userWiseList;

	}

	public void setEvent(String eventDate, String event, int userID,byte[] bytes) throws ParseException {
		Session session=sessionFactory.openSession();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		java.util.Date exDate = sf.parse(eventDate);
		Transaction transaction=session.beginTransaction();
		try {
			System.out.println(event);
			Event event1=new Event();
			event1.setEvent(event);
			event1.setEventDate(eventDate);
			event1.setCreatedDate(getDatelog());
			event1.setCreatedBy(userID);
			event1.setEventImg(bytes);
			session.save(event1);
			transaction.commit();
			
		}
		catch (Exception e) {
			// TODO: handle exception
		}
		
		
	}

	public List<Event> showEvent(String date) throws IOException {
		Session session = sessionFactory.openSession();
		List<Event> events=new ArrayList<Event>();
		System.out.println(date);
		try {
			String SQL_QUERY = "from Event where eventDate='"+date+"' ";

			Query query = session.createQuery(SQL_QUERY);

			for (Iterator<?> it = ((org.hibernate.Query<?>) query).iterate(); it.hasNext();) {
				if(it.hasNext()) {
					Event Obj = (Event) it.next();
					Obj.getEvent();
					Obj.getEventImg();
					byte[] image=Obj.getEventImg();
					System.out.println(Obj.getEventImg()+"dao");
					events.add(Obj);
					
					}
			}

		} catch (HibernateException ex) {
			ex.printStackTrace();
		} finally {
			session.close();
		}
		return events;
	}

	public List<RoomRegister> getActivatedlist() {
		ArrayList<RoomRegister> activatedList = new ArrayList<RoomRegister>();
		Session session = sessionFactory.openSession();
		try {

			String SQL_QUERY = "from RoomRegister where Status=1";

			Query query = session.createQuery(SQL_QUERY);

			

			for (Iterator<?> it = ((org.hibernate.Query<?>) query).iterate(); it.hasNext();) {
				if (it.hasNext()) {
					RoomRegister Obj = (RoomRegister) it.next();
					System.out.println(Obj.getAge());
					activatedList.add(Obj);
				}
			}
		}

		catch (HibernateException ex) {
			ex.printStackTrace();
		} finally {
			session.close();
		}
		return activatedList;

	}

	public List<RoomRegister> getDeactivatedlist() {
		ArrayList<RoomRegister> deActiveList = new ArrayList<RoomRegister>();
		Session session = sessionFactory.openSession();
		try {

			String SQL_QUERY = "from RoomRegister where Status=0";

			Query query = session.createQuery(SQL_QUERY);

			for (Iterator<?> it = ((org.hibernate.Query<?>) query).iterate(); it.hasNext();) {
				if (it.hasNext()) {
					RoomRegister Obj = (RoomRegister) it.next();
					System.out.println(Obj.getAge());
					
					deActiveList.add(Obj);
				}
			}
		}

		catch (HibernateException ex) {
			ex.printStackTrace();
		} finally {
			session.close();
		}
		return deActiveList;

	}

	public void activateUser(int userID) {
		Session session = sessionFactory.openSession();
		Transaction transaction=session.beginTransaction();
		try {
			Query query=session.createQuery("update RoomRegister set status=1 where ID='"+userID+"' ");
			query.executeUpdate();
			
			session.saveOrUpdate(query);
			transaction.commit();
		}
		catch (Exception e) {
			// TODO: handle exception
		}
		finally {
			session.close();
		}
		
		
	}
	
	public List<RoomRegister> getRegisterUser(int userName) {
		ArrayList<RoomRegister> registerInfo = new ArrayList<RoomRegister>();
		Session session = sessionFactory.openSession();
		try {

			String SQL_QUERY = "from RoomRegister where id='"+userName+"'";

			Query query = session.createQuery(SQL_QUERY);

			for (Iterator<?> it = ((org.hibernate.Query<?>) query).iterate(); it.hasNext();) {
				if (it.hasNext()) {
					RoomRegister Obj = (RoomRegister) it.next();
					System.out.println(Obj.getAge());
					
					registerInfo.add(Obj);
				}
			}
		}

		catch (HibernateException ex) {
			ex.printStackTrace();
		} finally {
			session.close();
		}
		return registerInfo;

	}

	



}
