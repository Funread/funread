from django.db import migrations

class Migration(migrations.Migration):
    dependencies = [
        ('BooksDilemma', '0002_bookcategory_description_bookdilemma_description_and_more'),
    ]

    operations = [
        migrations.RunSQL(
            """
            -- Eliminar datos de tablas hijas primero
            DELETE FROM dilemmaperbook;
            DELETE FROM bookdilemma;
            DELETE FROM bookdimension;
            DELETE FROM bookcategory;

            -- Reiniciar contadores autoincrementales
            ALTER TABLE dilemmaperbook AUTO_INCREMENT = 1;
            ALTER TABLE bookdilemma AUTO_INCREMENT = 1;
            ALTER TABLE bookdimension AUTO_INCREMENT = 1;
            ALTER TABLE bookcategory AUTO_INCREMENT = 1;

            /* Book category table injection */
            INSERT INTO `bookcategory` (`CategoryName`, `Description`) VALUES 
            ('Social Justice in Education', 'At school, social justice means treating everyone equally, eliminating unfair rules, and allowing everyone to participate.');
            SET @cat_id = LAST_INSERT_ID();

            /* Book dimension table injection */
            INSERT INTO `bookdimension` (`DimensionName`, `BookCategoryID`, `Description`) VALUES
            ('Redistributive Dimension in Education', @cat_id, 'Providing more help to those who need it most so that everyone has the same opportunities to learn and progress.'),
            ('Recognition Dimension in Education', @cat_id, 'Valuing all people for who they are, respecting their cultures, languages, ways of life, and beliefs.'),
            ('Representation Dimension in Education', @cat_id, 'All people should be able to participate, be heard, and make decisions in school and in society.');

            -- Guardar los IDs de las dimensiones
            SET @dim1 = (SELECT bookdimensionid FROM bookdimension WHERE DimensionName = 'Redistributive Dimension in Education' AND BookCategoryID = @cat_id);
            SET @dim2 = (SELECT bookdimensionid FROM bookdimension WHERE DimensionName = 'Recognition Dimension in Education' AND BookCategoryID = @cat_id);
            SET @dim3 = (SELECT bookdimensionid FROM bookdimension WHERE DimensionName = 'Representation Dimension in Education' AND BookCategoryID = @cat_id);

            /* Book dilemma table injection */
            INSERT INTO `bookdilemma` (`Dilemma`, `BookDimensionID`, `Description`) VALUES
            ('Students with Special Needs', @dim1, 'Students with disabilities need more support to have the same opportunities. Helping them is a way to be fair.'),
            ('Learning Difficulties', @dim1, 'Some students learn differently and need more time or support. Helping them is not giving them an advantage—it''s making sure everyone can learn.'),
            ('School Scholarships', @dim1, 'Scholarships help students with fewer resources or good grades so that everyone can continue studying.'),
            ('Child Labor', @dim1, 'Children should study and play, not work. Child labor hinders their development and should not be allowed.'),
            ('Access to ICTs', @dim2, 'Having access to the internet and technology enables learning, communication, and staying informed. It is a right for all.'),
            ('Women', @dim2, 'Men and women must have the same opportunities. Treating women differently is unfair and is called discrimination.'),
            ('School Bullying', @dim2, 'School bullying is violence. We must teach how to resolve problems with respect and support those who suffer from bullying.'),
            ('Cultural Identity', @dim2, 'It is important to adapt to new cultures without forgetting one’s own roots. Each person does this at their own pace and deserves respect.'),
            ('Students with Low Participation', @dim3, 'All students should feel part of the school. Listening to them and giving them space helps them participate more.'),
            ('Voting and General Elections', @dim3, 'Voting allows people to make decisions in their country. Even if not everyone can vote, those who live there should also be heard.'),
            ('Official Languages', @dim3, 'Bilingual education teaches in two languages to help communication and value different cultures. It’s important for schools to promote this learning to bring people together.'),
            ('Universal Justice', @dim3, 'Universal justice seeks fair access to justice for all. Participating in decision-making is key to living in a democracy and peace.');
            """
        ),
    ]
