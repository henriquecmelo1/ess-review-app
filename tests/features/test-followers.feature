Feature: Following and Unfollowing Users

    Scenario: User follows another user
        Given a user with id 1
        And another user with id 2
        When the first user follows the second user
        Then the first user should be following the second user

    Scenario: User unfollows another user
        Given a user with id 1
        And another user with id 2
        And the first user follows the second user
        When the first user unfollows the second user
        Then the first user should not be following the second user


    Scenario: User views their followers
        Given a user with id 1
        And another user with id 2
        And the first user follows the second user
        When the first user views their list of followers
        Then the list of followers should include the second user

    Scenario: User views who they are following
        Given a user with id 1
        And another user with id 2
        And the first user follows the second user
        When the first user views their list of following users
        Then the list of following users should include the second user