BASE_PREMIUM = 3253


def get_quote(age, length_of_tlc, length_of_dl, points, accidents,
              vehicle_value, deductible):
    liability_premium = BASE_PREMIUM
    physical_premium = 0

    if age < 21:
        liability_premium += 500

    if length_of_tlc < 1:
        liability_premium += 800

    if length_of_dl < 3:
        liability_premium += 200
    elif length_of_dl < 1:
        liability_premium += 800

    if points > 0 and points < 7:
        liability_premium += points * 50
    elif points > 6:
        liability_premium += ((6 * 50) + ((points - 6) * 200))

    if accidents:
        liability_premium *= 600

    if deductible == 500:
        if liability_premium < 3500:
            physical_premium = vehicle_value * .08
        elif liability_premium < 5000:
            physical_premium = vehicle_value * .1
        elif liability_premium < 6000:
            physical_premium = vehicle_value * .12
        elif liability_premium < 7500:
            physical_premium = vehicle_value * .14
    elif deductible == 1000:
        if liability_premium < 3500:
            physical_premium = vehicle_value * .07
        elif liability_premium < 5000:
            physical_premium = vehicle_value * .09
        elif liability_premium < 6000:
            physical_premium = vehicle_value * .11
        elif liability_premium < 7500:
            physical_premium = vehicle_value * .13

    return (liability_premium, physical_premium)
