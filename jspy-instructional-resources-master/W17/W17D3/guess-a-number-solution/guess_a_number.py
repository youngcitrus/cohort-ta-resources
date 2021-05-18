import random

guesses_taken = 0

print("Hello! What is your name?")
player_name = input()

number = random.randint(1, 20)
print(f"Well, {player_name}, I am thinking of a number between 1 and 20.")

while guesses_taken < 6:
    print("Take a guess.")
    guess = int(input())
    guesses_taken += 1
    if guess < number:
        print("Your guess is too low.")
    elif guess > number:
        print("Your guess is too high.")
    elif guess == number:
        break

if guess == number:
    print(f"Good job {player_name}! You guessed the number in {guesses_taken} guesses!")
else:
    print(f"Sorry, {player_name}. You could not guess my number {number}.")
