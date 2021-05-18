import psycopg2

CONNECTION_PARAMETERS = {
                          'dbname': 'psycopg_test_db',
                          'user': 'psycopg_test_user',
                          'password': 'password',
}


def reset_db():
    with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
        with conn.cursor() as curs:
            print(dir(curs))
            curs.execute('''
                         DROP TABLE cars;
                         DROP TABLE owners;
                         CREATE TABLE owners (
                           id SERIAL PRIMARY KEY,
                           first_name VARCHAR(255) NOT NULL,
                           last_name VARCHAR(255) NOT NULL,
                           email VARCHAR(255) NOT NULL
                         );
                         CREATE TABLE cars (
                           id SERIAL PRIMARY KEY,
                           manu_year INTEGER NOT NULL,
                           make VARCHAR(255),
                           model VARCHAR(255),
                           owner_id INTEGER NOT NULL,
                           FOREIGN KEY (owner_id) REFERENCES owners(id)
                         );
                         INSERT INTO owners (first_name, last_name, email)
                           VALUES
                           ('Tim', 'Petrol', 'rotary@fast.com'),
                           ('Ryan', 'Runner', '10sec@jdm.com'),
                           ('Tia', 'Petrol', 'typer@wtec.com');
                         INSERT INTO cars (manu_year, make, model, owner_id)
                           VALUES
                           (1993, 'Mazda', 'Rx7', 1),
                           (1995, 'Mitsubishi', 'Eclipse', 2),
                           (1994, 'Acura', 'Integra', 3);
                         ''')


def print_all_cars():
  with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
      with conn.cursor() as curs:
          curs.execute('SELECT manu_year, make, model, owner_id FROM cars;')
          cars = curs.fetchall()
          for car in cars:
            print(car)


def get_owners_cars(owner_id):
    """
    Fetch and return all cars in the cars table
    :param owner_id: <int> the id of the owner who's cars to return
    :return: <list> the results of the query
    """
    with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
        with conn.cursor() as curs:
            curs.execute("""
                         SELECT manu_year, make, model, owner_id FROM cars
                         WHERE owner_id = %(owner_id)s
                         """,
                         {'owner_id': owner_id})
            results = curs.fetchall()
            return results


def add_new_car(manu_year, make, model, owner_id):
  """
  Add the given car to the database
  :param manu_year: <int> the year the car was made
  :param make: <string> the manufacturer of the car
  :param model: <string> the model of the car
  :param owner_id: <int> the id number of the owner
  """
  with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
      with conn.cursor() as curs:
          # curs.execute(f'INSERT INTO {table}{columns} VALUES{values};')
          curs.execute("""
                        INSERT INTO cars (manu_year, make, model, owner_id)
                        VALUES (%(manu_year)s, %(make)s,
                        %(model)s, %(owner_id)s)
                        """,
                        {'manu_year': manu_year,
                        'make': make,
                        'model': model,
                        'owner_id': owner_id})


def change_car_owner(car_id, new_owner_id):
    """
    Update the owner of a car, both by record id
    :param car_id: <int> the id of the car to change
    :param new_owner_id: <int> the owner_id to give ownership to
    """
    with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
        with conn.cursor() as curs:
            curs.execute("""
                         UPDATE cars SET owner_id = %(new_owner_id)s
                         WHERE id = %(car_id)s
                         """,
                         {'car_id': car_id,
                          'new_owner_id': new_owner_id})


def delete_car(car_id):
    """
    Delete the record for a car given an id for that car
    :param car_id: <int> the id of the car record to remove
    """
    with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
        with conn.cursor() as curs:
            curs.execute("""
                         DELETE FROM cars WHERE id = %(car_id)s
                         """,
                         {'car_id': car_id})


reset_db()


print_all_cars()
# (1993, 'Mazda', 'Rx7', 1)
# (1995, 'Mitsubishi', 'Eclipse', 2)
# (1994, 'Acura', 'Integra', 3)

print(get_owners_cars(1))  # [(1993, 'Mazda', 'Rx7', 1)]

print(get_owners_cars(2))  # [(1995, 'Mitsubishi', 'Eclipse', 2)]
add_new_car(2000, 'Ford', 'Lightning', 2)
add_new_car(1994, 'Toyota', 'Supra', 2)   
print(get_owners_cars(2))  # [(1995, 'Mitsubishi', 'Eclipse', 2), (2000, 'Ford', 'Lightning', 2), (1994, 'Toyota', 'Supra', 2)]

change_car_owner(5, 1)
print(get_owners_cars(1))  # [(1993, 'Mazda', 'Rx7', 1), (1994, 'Toyota', 'Supra', 1)]
print(get_owners_cars(2))  # [(1995, 'Mitsubishi', 'Eclipse', 2), (2000, 'Ford', 'Lightning', 2)]

delete_car(2)
print(get_owners_cars(2))  # [(2000, 'Ford', 'Lightning', 2)]
